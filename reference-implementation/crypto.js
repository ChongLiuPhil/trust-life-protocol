import crypto from 'node:crypto';

export function canonicalize(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonicalize(value[k])}`).join(',')}}`;
}

export function unsignedObject(value) {
  const { jws, ...rest } = value;
  return rest;
}

function b64urlToBuffer(value) {
  return Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

export function verifyCompactJws(jws, keyRecord, expectedPayload) {
  const parts = String(jws || '').trim().split('.');
  if (parts.length !== 3) return { ok:false, reason:'invalid_compact_jws' };
  let header;
  let payload;
  try {
    header = JSON.parse(b64urlToBuffer(parts[0]).toString('utf8'));
    payload = JSON.parse(b64urlToBuffer(parts[1]).toString('utf8'));
  } catch {
    return { ok:false, reason:'invalid_jws_json' };
  }
  if (header.alg !== 'EdDSA') return { ok:false, reason:'unexpected_alg', header, payload };
  if (header.kid !== keyRecord?.id) return { ok:false, reason:'kid_mismatch', header, payload };
  if (!keyRecord?.publicKeyJwk) return { ok:false, reason:'missing_public_key', header, payload };
  if (expectedPayload && canonicalize(payload) !== canonicalize(expectedPayload)) {
    return { ok:false, reason:'payload_mismatch', header, payload };
  }
  try {
    const publicKey = crypto.createPublicKey({ key:keyRecord.publicKeyJwk, format:'jwk' });
    const valid = crypto.verify(null, Buffer.from(`${parts[0]}.${parts[1]}`), publicKey, b64urlToBuffer(parts[2]));
    return { ok:valid, reason:valid?'valid':'signature_invalid', header, payload };
  } catch (error) {
    return { ok:false, reason:`key_or_signature_error:${error.message}`, header, payload };
  }
}

export function keyValidAt(key, at) {
  if (!key) return { ok:false, reason:'missing_key' };
  const t = Date.parse(at);
  if (Number.isNaN(t)) return { ok:false, reason:'invalid_signature_time' };
  if (key.status === 'revoked') return { ok:false, reason:'key_revoked' };
  if (key.validFrom && t < Date.parse(key.validFrom)) return { ok:false, reason:'before_key_validity' };
  if (key.validUntil && t > Date.parse(key.validUntil)) return { ok:false, reason:'after_key_validity' };
  return { ok:true, reason:key.status === 'retired' ? 'historically_valid_retired_key' : 'valid' };
}

const app = document.querySelector('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const defaultSubject = 'tl:subject:apple-2026-0001';
const subjectId = new URLSearchParams(location.search).get('subject') || defaultSubject;
const staticBundleUrl = new URL('../../examples/apple-supply-chain/trust-bundle.json', import.meta.url);

function fromBundle(b, id) {
  const orgs = new Map(b.organizations.map(x => [x.id, x]));
  const evs = new Map(b.evidence.map(x => [x.id, x]));
  const vs = new Map(b.verifications.map(x => [x.id, x]));
  const subject = b.subjects.find(x => x.id === id);
  if (!subject) throw new Error(`Unknown subject: ${id}`);
  const conformance = b.conformance.find(x => x.subjectId === id) || null;
  const claimIds = conformance?.claimIds || b.claims.filter(c => c.subjectId === id).map(c => c.id);
  return {
    bundleVersion: b.bundleVersion,
    subject,
    owner: orgs.get(subject.organizationId),
    conformance,
    unresolvedIncidents: b.incidents.filter(i => i.subjectId === id && !['resolved','not-substantiated'].includes(i.status)).length,
    claims: claimIds.map(cid => b.claims.find(c => c.id === cid)).filter(Boolean).map(c => ({
      ...c,
      evidence: c.evidenceIds.map(eid => evs.get(eid)).filter(Boolean).map(e => ({...e, publicUri: new URL(e.uri, staticBundleUrl).href})),
      verifications: c.verificationIds.map(vid => vs.get(vid)).filter(Boolean).map(v => ({...v, verifierName: orgs.get(v.verifierOrganizationId)?.name, credentialPublicUri: v.credentialUri ? new URL(v.credentialUri, staticBundleUrl).href : null}))
    })),
    cryptographic: null,
    pilotAssessment: null,
    qrResolverPath: null
  };
}

async function loadView() {
  try {
    const r = await fetch(`/v1/subjects/${encodeURIComponent(subjectId)}`, {cache:'no-store'});
    if (r.ok) return r.json();
  } catch {}
  const b = await fetch(staticBundleUrl, {cache:'no-store'}).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });
  return fromBundle(b, subjectId);
}

async function sha256(url) {
  const r = await fetch(url, {cache:'no-store'});
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const digest = await crypto.subtle.digest('SHA-256', await r.arrayBuffer());
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2,'0')).join('');
}

const badge = (label, ok) => `<span class="level">${esc(label)}: ${ok ? 'valid' : 'invalid'}</span>`;
const findingBadge = status => `<span class="finding">${esc(status)}</span>`;

try {
  const v = await loadView();
  const c = v.conformance;
  const a = v.pilotAssessment;
  const canonical = new URL(location.href);
  canonical.search = '';
  canonical.searchParams.set('subject', v.subject.id);
  const qrTarget = v.qrResolverPath ? new URL(v.qrResolverPath, location.origin).href : canonical.href;
  const auth = v.cryptographic;

  app.innerHTML = `
    <div class="eyebrow">Subject</div><h2>${esc(v.subject.name)}</h2>
    ${c ? `<p><span class="level">${esc(c.level)}</span> <strong>${esc(c.status)}</strong> · ${esc(c.profile)} v${esc(c.profileVersion)}</p>` : ''}
    <div class="grid">
      <div><div class="eyebrow">Responsible organization</div><p>${esc(v.owner?.name)}</p></div>
      <div><div class="eyebrow">Bundle</div><p class="mono">v${esc(v.bundleVersion)}</p></div>
      <div><div class="eyebrow">Unresolved incidents</div><p class="ok">${esc(v.unresolvedIncidents)}</p></div>
    </div>

    ${a ? `<hr><h2>Pilot conformance assessment</h2>
      <p><span class="level">${esc(a.decision)}</span> · ${esc(a.profileId)} v${esc(a.profileVersion)} · overall evidence level ${esc(a.overallEvidenceLevel || 'n/a')}</p>
      <p class="muted">Requirement-level findings are shown individually; this is not a universal trust score.</p>
      ${a.findings.map(f => `<div class="requirement"><p>${findingBadge(f.status)} <strong>${esc(f.requirementId)}</strong> · ${esc(f.message)}</p>${f.basis?.claimIds?.length ? `<p class="mono">Claims: ${esc(f.basis.claimIds.join(', '))}</p>` : ''}${f.basis?.missing?.length ? `<p class="muted">Missing/failed conditions: ${esc(f.basis.missing.join(', '))}</p>` : ''}</div>`).join('')}
      ${a.blockingGaps.length ? `<p><strong>Blocking gaps:</strong> ${esc(a.blockingGaps.join(', '))}</p>` : '<p><strong>Blocking gaps:</strong> none</p>'}
      <p class="muted">${esc(a.notice)}</p>` : `<hr><p class="muted">Pilot onboarding assessment is available when served by the v0.4 reference Registry.</p>`}

    ${auth ? `<hr><h2>Cryptographic checks</h2>
      <p>${auth.manifests.map(x => badge('evidence manifest signature', x.valid)).join(' ') || 'No signed manifest for this subject.'}</p>
      ${auth.credentials.map(x => `<p>${badge('credential signature', x.signatureValid)} ${badge(`credential status ${x.status}`, x.status === 'active' && x.statusSignatureValid)}</p>`).join('')}
      <p>${badge('registry descriptor signature', auth.registryDescriptor.valid)}</p><p class="muted">${esc(auth.notice)}</p>` : `<hr><p class="muted">Signature verification is available when this page is served by the reference Registry.</p>`}

    <hr><h2>Claims, evidence and verification</h2>
    ${v.claims.map((claim, ci) => `<div class="claim"><p><strong>${esc(claim.level)} · ${esc(claim.statement)}</strong></p><p class="mono">${esc(claim.requirementId)}</p>${claim.evidence.map((e, ei) => `<div class="evidence"><p><strong>Evidence:</strong> ${esc(e.category)} · ${esc(e.capturedAt)}</p><p class="mono">SHA-256 ${esc(e.integrity.digest)}</p><p><span class="digest" data-digest="${ci}-${ei}">checking bytes…</span> · <a href="${esc(e.publicUri)}">open evidence</a></p></div>`).join('')}${claim.verifications.map(x => `<p><strong>Verification:</strong> ${esc(x.status)} · ${esc(x.method)} · ${esc(x.verifierName || x.verifierOrganizationId)}${x.credentialPublicUri ? ` · <a href="${esc(x.credentialPublicUri)}">credential</a>` : ''}</p>`).join('')}${(claim.limitations || []).map(x => `<p class="muted">Limitation: ${esc(x)}</p>`).join('')}</div>`).join('')}
    ${c?.limitations?.length ? `<hr>${c.limitations.map(x => `<p class="muted">Conformance limitation: ${esc(x)}</p>`).join('')}` : ''}
    <hr><div class="eyebrow">QR-target resolver URL</div><p class="mono">${esc(qrTarget)}</p><button id="copy">Copy QR target</button>
  `;

  document.querySelector('#copy').onclick = async () => {
    await navigator.clipboard.writeText(qrTarget);
    document.querySelector('#copy').textContent = 'Copied';
  };

  v.claims.forEach((claim, ci) => claim.evidence.forEach(async (e, ei) => {
    const el = document.querySelector(`[data-digest="${ci}-${ei}"]`);
    try {
      const actual = await sha256(e.publicUri);
      el.textContent = actual.toLowerCase() === e.integrity.digest.toLowerCase() ? 'bytes match recorded digest' : 'DIGEST MISMATCH';
    } catch (err) {
      el.textContent = `digest check unavailable: ${err.message}`;
    }
  }));
} catch (e) {
  app.innerHTML = `<h2>Unable to load verification data</h2><p>${esc(e.message)}</p><p class="muted">Use the reference server with <code>npm run serve</code>.</p>`;
}

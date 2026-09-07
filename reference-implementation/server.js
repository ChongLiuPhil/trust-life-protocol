#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unsignedObject, verifyCompactJws } from './crypto.js';

const here=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(here,'..');
const demoRoot=path.join(repoRoot,'examples','apple-supply-chain');
const webRoot=path.join(here,'web');
const bundlePath=path.join(demoRoot,'trust-bundle.json');
const descriptorPath=path.join(repoRoot,'registry','descriptor.json');
const peerDescriptorPath=path.join(repoRoot,'registry','peers','secondary.json');
const statusPath=path.join(repoRoot,'registry','demo','credential-status.json');
const host=process.env.HOST||'127.0.0.1', port=Number(process.env.PORT||8080);
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const readBundle=()=>readJson(bundlePath);
const byId=xs=>new Map((xs||[]).map(x=>[x.id,x]));

function json(res,status,value){res.writeHead(status,{'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','cache-control':'no-store'});res.end(JSON.stringify(value,null,2));}
function safeFile(base,relative){const full=path.resolve(base,relative),prefix=base+path.sep;return full===base||full.startsWith(prefix)?full:null;}
function serveFile(res,file,type){if(!file||!fs.existsSync(file)||!fs.statSync(file).isFile())return json(res,404,{error:'not_found'});res.writeHead(200,{'content-type':type,'cache-control':'no-store'});fs.createReadStream(file).pipe(res);}

function verifySigned(obj,keys){const keyId=obj.keyId||obj.keyIds?.[0],key=keys.get(keyId);const result=verifyCompactJws(obj.jws,key,unsignedObject(obj));return {id:obj.id,keyId,valid:result.ok,reason:result.reason};}

function cryptographicView(bundle,subjectId,claimIds){
  const keys=byId(bundle.keys),verifications=byId(bundle.verifications);
  const manifests=(bundle.manifests||[]).filter(m=>m.subjectId===subjectId).map(m=>({type:'evidence-manifest',...verifySigned(m,keys)}));
  const credentials=[];
  for(const claimId of claimIds){
    const claim=(bundle.claims||[]).find(c=>c.id===claimId);
    for(const verificationId of claim?.verificationIds||[]){
      const v=verifications.get(verificationId); if(!v?.credentialJwsUri)continue;
      const vcFile=safeFile(demoRoot,v.credentialUri),jwsFile=safeFile(demoRoot,v.credentialJwsUri),key=keys.get(v.keyId);
      if(!vcFile||!jwsFile||!fs.existsSync(vcFile)||!fs.existsSync(jwsFile)){credentials.push({verificationId,signatureValid:false,reason:'fixture_missing'});continue;}
      const vc=readJson(vcFile),sig=verifyCompactJws(fs.readFileSync(jwsFile,'utf8').trim(),key,vc),status=readJson(statusPath),statusSig=verifySigned(status,keys);
      credentials.push({verificationId,credentialId:vc.id,keyId:v.keyId,signatureValid:sig.ok,signatureReason:sig.reason,status:status.status,statusSignatureValid:statusSig.valid,statusReason:statusSig.reason});
    }
  }
  const descriptor=readJson(descriptorPath),registrySignature=verifySigned(descriptor,keys);
  return {manifests,credentials,registryDescriptor:registrySignature,notice:'Signature validity proves control of a declared key, not factual truth or safety.'};
}

function verificationView(bundle,subjectId){
  const orgs=byId(bundle.organizations),evidence=byId(bundle.evidence),verifications=byId(bundle.verifications);
  const subject=(bundle.subjects||[]).find(x=>x.id===subjectId);if(!subject)return null;
  const conformance=(bundle.conformance||[]).find(x=>x.subjectId===subjectId)||null;
  const claimIds=conformance?.claimIds||(bundle.claims||[]).filter(c=>c.subjectId===subjectId).map(c=>c.id);
  const claims=claimIds.map(id=>(bundle.claims||[]).find(c=>c.id===id)).filter(Boolean).map(c=>({...c,evidence:(c.evidenceIds||[]).map(id=>evidence.get(id)).filter(Boolean).map(e=>({...e,publicUri:`/demo/${e.uri}`})),verifications:(c.verificationIds||[]).map(id=>verifications.get(id)).filter(Boolean).map(v=>({...v,verifierName:orgs.get(v.verifierOrganizationId)?.name,credentialPublicUri:v.credentialUri?`/demo/${v.credentialUri}`:undefined,credentialJwsPublicUri:v.credentialJwsUri?`/demo/${v.credentialJwsUri}`:undefined}))}));
  const incidents=(bundle.incidents||[]).filter(i=>i.subjectId===subjectId);
  return {protocol:'Trust & Life Protocol',referenceImplementation:'0.3.0',bundleVersion:bundle.bundleVersion,subject,owner:orgs.get(subject.organizationId)||null,conformance,claims,incidents,unresolvedIncidents:incidents.filter(i=>!['resolved','not-substantiated'].includes(i.status)).length,cryptographic:cryptographicView(bundle,subjectId,claimIds),verificationPath:`/verify?subject=${encodeURIComponent(subject.id)}`,notice:'This view reports evidence, cryptographic integrity, signatures and status. It is not a food-safety guarantee or purchasing recommendation.'};
}

const server=http.createServer((req,res)=>{try{
  const url=new URL(req.url,`http://${req.headers.host||`${host}:${port}`}`);if(req.method!=='GET')return json(res,405,{error:'method_not_allowed'});
  if(url.pathname==='/health')return json(res,200,{ok:true,protocol:'trust-life',referenceImplementation:'0.3.0'});
  const bundle=readBundle(),keys=byId(bundle.keys);
  if(url.pathname==='/.well-known/trust-life-registry')return json(res,200,readJson(descriptorPath));
  if(url.pathname==='/v1/federation'){const primary=readJson(descriptorPath),peer=readJson(peerDescriptorPath);return json(res,200,{registry:{...primary,signatureValid:verifySigned(primary,keys).valid},peers:[{...peer,signatureValid:verifySigned(peer,keys).valid}],rule:'Peer records retain their source identity; conflicts must be surfaced rather than silently resolved.'});}
  if(url.pathname==='/v1/keys')return json(res,200,{items:bundle.keys});
  if(url.pathname.startsWith('/v1/keys/')){const id=decodeURIComponent(url.pathname.slice('/v1/keys/'.length)),key=keys.get(id);return key?json(res,200,key):json(res,404,{error:'key_not_found'});}
  if(url.pathname.startsWith('/v1/credentials/')&&url.pathname.endsWith('/status')){const encoded=url.pathname.slice('/v1/credentials/'.length,-'/status'.length),id=decodeURIComponent(encoded),status=readJson(statusPath);return id===status.credentialId?json(res,200,status):json(res,404,{error:'credential_status_not_found'});}
  if(url.pathname==='/v1/subjects')return json(res,200,{items:bundle.subjects.map(s=>({...s,verificationPath:`/verify?subject=${encodeURIComponent(s.id)}`}))});
  if(url.pathname.startsWith('/v1/subjects/')){const id=decodeURIComponent(url.pathname.slice('/v1/subjects/'.length)),view=verificationView(bundle,id);return view?json(res,200,view):json(res,404,{error:'subject_not_found'});}
  if(url.pathname==='/demo/trust-bundle.json')return serveFile(res,bundlePath,'application/json; charset=utf-8');
  if(url.pathname.startsWith('/demo/')){const file=safeFile(demoRoot,decodeURIComponent(url.pathname.slice('/demo/'.length))),ext=path.extname(file||'').toLowerCase(),type=ext==='.json'||ext==='.jsonld'?'application/json; charset=utf-8':ext==='.jws'?'application/jose':'application/octet-stream';return serveFile(res,file,type);}
  if(url.pathname==='/'||url.pathname==='/verify'||url.pathname==='/index.html')return serveFile(res,path.join(webRoot,'index.html'),'text/html; charset=utf-8');
  if(url.pathname==='/app.js')return serveFile(res,path.join(webRoot,'app.js'),'text/javascript; charset=utf-8');
  return json(res,404,{error:'not_found'});
}catch(error){json(res,500,{error:'internal_error',message:error.message});}});
server.listen(port,host,()=>console.log(`Trust & Life v0.3 registry: http://${host}:${port}/verify?subject=tl%3Asubject%3Aapple-2026-0001`));

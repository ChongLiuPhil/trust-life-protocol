const app = document.querySelector('#app');
const bundleUrl = '../../examples/apple-supply-chain/trust-bundle.json';
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

try {
  const b = await fetch(bundleUrl).then(r => { if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });
  const orgs = new Map(b.organizations.map(x=>[x.id,x]));
  const evidence = new Map(b.evidence.map(x=>[x.id,x]));
  const verifications = new Map(b.verifications.map(x=>[x.id,x]));
  const conf = b.conformance[0];
  const subject = b.subjects.find(x=>x.id===conf.subjectId);
  const owner = orgs.get(subject.organizationId);
  const unresolved = b.incidents.filter(i=>!['resolved','not-substantiated'].includes(i.status));
  const claims = conf.claimIds.map(id=>b.claims.find(c=>c.id===id)).filter(Boolean);

  app.innerHTML = `
    <div class="eyebrow">Subject</div><h2>${esc(subject.name)}</h2>
    <p><span class="level">${esc(conf.level)}</span> <strong>${esc(conf.status)}</strong></p>
    <div class="grid">
      <div><div class="eyebrow">Producer</div><p>${esc(owner?.name)}</p></div>
      <div><div class="eyebrow">Profile</div><p class="mono">${esc(conf.profile)} v${esc(conf.profileVersion)}</p></div>
      <div><div class="eyebrow">Unresolved incidents</div><p class="ok">${unresolved.length}</p></div>
    </div>
    <hr><h2>Claims and evidence</h2>
    ${claims.map(c=>`<div class="claim"><p><strong>${esc(c.level)} · ${esc(c.statement)}</strong></p><p class="mono">${esc(c.requirementId)}</p><p>${c.evidenceIds.map(id=>{const e=evidence.get(id);return `Evidence: ${esc(e?.category)} · ${esc(e?.sourceOrganizationId)} · ${esc(e?.capturedAt)}`}).join('<br>')}</p><p>${c.verificationIds.map(id=>{const v=verifications.get(id);return `Verification: ${esc(v?.status)} · ${esc(v?.method)} · ${esc(orgs.get(v?.verifierOrganizationId)?.name)}`}).join('<br>')}</p>${(c.limitations||[]).map(x=>`<p class="muted">Limitation: ${esc(x)}</p>`).join('')}</div>`).join('')}
    <hr><div class="eyebrow">Portable verification URL</div><p class="mono">${esc(location.href)}</p><button id="copy">Copy URL for QR encoding</button>
  `;
  document.querySelector('#copy').onclick = async()=>{await navigator.clipboard.writeText(location.href);document.querySelector('#copy').textContent='Copied';};
} catch (e) {
  app.innerHTML = `<h2>Unable to load demo bundle</h2><p>${esc(e.message)}</p><p class="muted">Serve the repository over HTTP rather than opening this HTML file directly.</p>`;
}

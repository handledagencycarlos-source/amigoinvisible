// Manda el recordatorio por email a todos los que pusieron email al apuntarse.
// Lo lanza GitHub Actions el martes a las 10:00 (ver .github/workflows/recordatorio.yml).
const fs = require('fs');
const vm = require('vm');
const nodemailer = require('nodemailer');

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('config.js', 'utf8'), ctx);
const C = ctx.window.CONFIG;
const DB = C.firebase.databaseURL.replace(/\/$/, '');
const SITE = (C.siteUrl && !C.siteUrl.includes('PON-AQUI')) ? C.siteUrl : `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${(process.env.GITHUB_REPOSITORY || '').split('/')[1]}/`;

(async () => {
  const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
  const diaSorteo = new Date(C.drawAt).toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
  const forzar = (process.env.FORZAR || '').toLowerCase() === 'si';
  if (hoy !== diaSorteo && !forzar) { console.log(`Hoy (${hoy}) no es el día del sorteo (${diaSorteo}). Nada que hacer.`); return; }

  const yaEnviado = await (await fetch(`${DB}/reminder.json`)).json();
  if (yaEnviado && !forzar) { console.log('El recordatorio ya se envió. Nada que hacer.'); return; }

  const people = (await (await fetch(`${DB}/people.json`)).json()) || {};
  const budget = (await (await fetch(`${DB}/config/budget.json`)).json()) ?? C.budget;
  const lista = Object.values(people).filter(p => p.email);
  console.log(`${Object.keys(people).length} apuntados, ${lista.length} con email.`);
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) throw new Error('Faltan los secretos GMAIL_USER y GMAIL_APP_PASSWORD (README, paso 3).');

  const mail = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let ok = 0;
  for (const p of lista) {
    try {
      await mail.sendMail({
        from: `"Amigo Invisible 🎅" <${process.env.GMAIL_USER}>`,
        to: p.email,
        subject: '🎁 ¡Ya sabemos a quién le regalas!',
        text: `¡Hola ${p.name}!\n\nEl sorteo del amigo invisible ya está hecho.\nEntra con tu PIN para descubrir a quién te ha tocado (y su talla de camiseta):\n${SITE}\n\nPresupuesto: ${budget}€ · ¡Que no se entere nadie!`,
        html: `<div style="font-family:Arial,sans-serif;font-size:16px;max-width:480px">
          <h2 style="color:#c8322f">¡Hola ${esc(p.name)}! 🎄</h2>
          <p>El sorteo del amigo invisible ya está hecho.</p>
          <p>Entra con tu PIN para descubrir a quién te ha tocado (y su talla de camiseta 👕).</p>
          <p><a href="${SITE}" style="display:inline-block;background:#c8322f;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:bold">Abrir mi regalo 🎁</a></p>
          <p style="color:#777">Presupuesto: ${budget}€ · ¡Shhh, que no se entere nadie! 🤫</p></div>`
      });
      ok++; console.log('Enviado a', p.name);
    } catch (e) { console.error('Fallo con', p.name, e.message); }
  }
  if (!forzar) await fetch(`${DB}/reminder.json`, { method: 'PUT', body: JSON.stringify({ at: Date.now(), ok }) });
  console.log(`Listo: ${ok}/${lista.length} emails enviados.`);
})().catch(e => { console.error(e); process.exit(1); });

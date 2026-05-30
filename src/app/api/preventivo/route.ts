import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Tipi ────────────────────────────────────────────────────────────────────
interface FormData {
  nome: string;
  email: string;
  telefono: string;
  servizio: string;
  data: string;
  luogo: string;
  visione: string;
  fonte: string;
}

// ── Helper: formatta la data in italiano ────────────────────────────────────
function formatData(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// ── Template HTML email ──────────────────────────────────────────────────────
function buildHtml(f: FormData): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuova Richiesta Preventivo</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border:1px solid #2a2a2a;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:48px 48px 32px;border-bottom:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.5em;text-transform:uppercase;color:#C5A059;">
                Nuova Richiesta
              </p>
              <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:0.05em;">
                Aldo Giuliani Photography
              </h1>
              <div style="margin:24px auto 0;width:60px;height:1px;background:linear-gradient(to right,transparent,#C5A059,transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <!-- Servizio badge -->
              <p style="display:inline-block;margin:0 0 32px;padding:6px 16px;border:1px solid #C5A059;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#C5A059;">
                ${f.servizio || 'Non specificato'}
              </p>

              <!-- Dati principali -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row('Nome e Cognome', f.nome)}
                ${row('Email', `<a href="mailto:${f.email}" style="color:#C5A059;text-decoration:none;">${f.email}</a>`)}
                ${f.telefono ? row('Telefono', `<a href="tel:${f.telefono}" style="color:#C5A059;text-decoration:none;">${f.telefono}</a>`) : ''}
                ${f.data ? row('Data Evento', formatData(f.data)) : ''}
                ${f.luogo ? row('Luogo / Città', f.luogo) : ''}
                ${f.fonte ? row('Come ci ha conosciuto', f.fonte) : ''}
              </table>

              <!-- Visione narrativa -->
              ${f.visione ? `
              <div style="margin-top:32px;padding:24px;border-left:2px solid #C5A059;background:#222;">
                <p style="margin:0 0 10px;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#C5A059;">
                  Visione Narrativa
                </p>
                <p style="margin:0;font-size:14px;line-height:1.8;color:#ffffff99;font-style:italic;">
                  "${f.visione}"
                </p>
              </div>` : ''}

              <!-- CTA risposta -->
              <div style="margin-top:40px;text-align:center;">
                <a href="mailto:${f.email}?subject=Re:%20Richiesta%20Preventivo%20${encodeURIComponent(f.servizio)}&body=Ciao%20${encodeURIComponent(f.nome.split(' ')[0])}%2C"
                   style="display:inline-block;padding:14px 32px;border:1px solid #C5A059;color:#C5A059;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;text-decoration:none;">
                  Rispondi a ${f.nome.split(' ')[0]}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:10px;color:#ffffff22;letter-spacing:0.2em;">
                Richiesta inviata tramite aldogiuliani.it
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;vertical-align:top;width:40%;">
        <span style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#ffffff40;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #2a2a2a;vertical-align:top;">
        <span style="font-size:13px;color:#ffffffcc;font-weight:300;">${value}</span>
      </td>
    </tr>
  `;
}

// ── API Route Handler ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Validazione variabili d'ambiente
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!gmailUser || !gmailPass || !contactEmail) {
    console.error('[preventivo/route] Variabili d\'ambiente mancanti');
    return NextResponse.json(
      { error: 'Configurazione server incompleta. Contattare l\'amministratore.' },
      { status: 500 }
    );
  }

  // Parsing body
  let formData: FormData;
  try {
    formData = await req.json();
  } catch {
    return NextResponse.json({ error: 'Dati non validi.' }, { status: 400 });
  }

  // Validazione campi obbligatori
  if (!formData.nome?.trim() || !formData.email?.trim() || !formData.servizio?.trim()) {
    return NextResponse.json(
      { error: 'Campi obbligatori mancanti (nome, email, servizio).' },
      { status: 400 }
    );
  }

  // Configurazione trasporto SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  // Invio email
  try {
    await transporter.sendMail({
      from: `"Aldo Giuliani Photography — Sito Web" <${gmailUser}>`,
      to: contactEmail,
      replyTo: formData.email,
      subject: `📸 Nuova richiesta: ${formData.servizio} — ${formData.nome}`,
      html: buildHtml(formData),
      text: [
        `NUOVA RICHIESTA PREVENTIVO`,
        `Servizio: ${formData.servizio}`,
        `Nome: ${formData.nome}`,
        `Email: ${formData.email}`,
        formData.telefono ? `Telefono: ${formData.telefono}` : '',
        formData.data ? `Data evento: ${formatData(formData.data)}` : '',
        formData.luogo ? `Luogo: ${formData.luogo}` : '',
        formData.visione ? `\nVisione:\n${formData.visione}` : '',
        formData.fonte ? `Come ci ha conosciuto: ${formData.fonte}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[preventivo/route] Errore invio email:', err);
    return NextResponse.json(
      { error: 'Impossibile inviare il messaggio. Riprova o contattaci direttamente.' },
      { status: 500 }
    );
  }
}

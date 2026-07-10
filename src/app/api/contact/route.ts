import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind erforderlich" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY fehlt in den Umgebungsvariablen!");
      return NextResponse.json(
        { error: "Server-Konfigurationsfehler. Bitte später versuchen." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Kontaktformular <noreply@mitcodean.com>",
      to: [process.env.CONTACT_EMAIL || "contact@mitcodean.com"],
      replyTo: email,
      subject: subject || `Neue Anfrage von ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
              color: #111827;
            }
            .container {
              max-width: 560px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.08);
              overflow: hidden;
            }
            .header {
              background: #B22222;
              padding: 20px 32px;
              border-bottom: 1px solid #e5e7eb;
            }
            .header h1 {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #ffffff;
              letter-spacing: -0.01em;
            }
            .content {
              padding: 32px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field:last-child {
              margin-bottom: 0;
            }
            .label {
              font-size: 12px;
              font-weight: 600;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              margin-bottom: 4px;
            }
            .value {
              font-size: 15px;
              color: #111827;
              line-height: 1.6;
              padding: 8px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .value:last-child {
              border-bottom: none;
            }
            .value a {
              color: #B22222;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .message-value {
              white-space: pre-wrap;
              background: #f9fafb;
              padding: 12px 16px;
              border-radius: 8px;
              font-size: 14px;
              line-height: 1.6;
              border: 1px solid #f3f4f6;
            }
            .footer {
              background: #f9fafb;
              padding: 16px 32px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .footer a {
              color: #B22222;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Neue Kontaktanfrage</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">E-Mail</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="label">Telefon</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              ${subject ? `
              <div class="field">
                <div class="label">Betreff</div>
                <div class="value">${subject}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Nachricht</div>
                <div class="message-value">${message}</div>
              </div>
            </div>
            <div class="footer">
              Gesendet über <a href="https://mitcodean.com">mitcodean.com</a>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Neue Kontaktanfrage
------------------

Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ''}
${subject ? `Betreff: ${subject}` : ''}

Nachricht:
${message}

--
Gesendet über mitcodean.com
      `.trim(),
    });

    if (error) {
      console.error("Resend Fehler:", error);
      return NextResponse.json(
        { error: `Fehler beim Senden: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("E-Mail gesendet, ID:", data?.id);

    return NextResponse.json(
      { success: true, message: "E-Mail erfolgreich gesendet" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Server-Fehler beim Senden der E-Mail:", error);
    return NextResponse.json(
      { error: "Ein Server-Fehler ist aufgetreten. Bitte versuche es später erneut." },
      { status: 500 }
    );
  }
}
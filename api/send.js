import 'dotenv/config';
import { Resend } from 'resend';

// Initialize Resend with the environment variable process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

/**
 * Sends a client application/intake email via Resend
 * @param {Object} details Form inputs from the user
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function sendApplicationEmail({
  businessName,
  yourName,
  phone,
  email,
  websiteStatus,
  websiteType,
  vision,
  message,
}) {
  // Support both 'vision' or 'message' for flexible naming
  const clientMessage = vision || message || 'No details provided';
  const clientName = yourName || 'Not specified';
  const clientBusiness = businessName || 'Not specified';
  const clientPhone = phone || 'Not provided';
  const clientStatus = websiteStatus || 'Starting from scratch';
  const clientType = websiteType || 'New Business Website';

  // Basic validation
  if (!email) {
    return { success: false, error: 'Email address is required.' };
  }

  // Check if API key is configured
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_placeholder' || apiKey.includes('your_resend_api_key')) {
    return {
      success: false,
      error: 'RESEND_API_KEY is not configured in .env. Please set your Resend API key to send live emails.'
    };
  }

  // Construct the ready-to-copy Antigravity Prototype Prompt
  const antigravityPrompt = `Build a fully functioning, high-converting prototype website (${clientType}) for a local business named ${clientBusiness}. They do/provide: ${clientMessage}. Give it a clean, modern, professional design tailored to this industry with a clear hero section, services list, about section, and a contact/booking form.`;

  // Beautiful, clean HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
        .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #065f46 0%, #059669 100%); padding: 24px 32px; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.025em; }
        .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 32px; }
        .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #059669; margin-bottom: 12px; }
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
        .data-table td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .data-table .label { width: 38%; color: #64748b; font-weight: 500; }
        .data-table .value { color: #0f172a; font-weight: 600; }
        .message-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-top: 8px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #14532d; white-space: pre-wrap; }
        .prompt-container { background-color: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 18px 20px; margin-top: 10px; margin-bottom: 24px; }
        .prompt-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .prompt-badge { display: inline-block; background-color: #059669; color: #ffffff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 4px; }
        .prompt-hint { font-size: 11px; color: #94a3b8; }
        .prompt-text { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.6; color: #f1f5f9; background-color: #1e293b; padding: 14px; border-radius: 6px; border: 1px solid #334155; user-select: all; white-space: pre-wrap; word-break: break-word; }
        .button { display: inline-block; background-color: #059669; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 10px; text-align: center; }
        .footer { background-color: #f8fafc; padding: 16px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🚀 New Website Application</h1>
          <p>Submitted via LowensELEVATE Intake Form</p>
        </div>
        <div class="content">
          <!-- 1. Client & Business Details -->
          <div class="section-title">Client &amp; Business Details</div>
          <table class="data-table">
            <tr>
              <td class="label">Business Name:</td>
              <td class="value">${escapeHtml(clientBusiness)}</td>
            </tr>
            <tr>
              <td class="label">Contact Person:</td>
              <td class="value">${escapeHtml(clientName)}</td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td class="value"><a href="mailto:${escapeHtml(email)}" style="color: #059669; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td class="label">Phone Number:</td>
              <td class="value"><a href="tel:${escapeHtml(clientPhone)}" style="color: #0f172a; text-decoration: none;">${escapeHtml(clientPhone)}</a></td>
            </tr>
            <tr>
              <td class="label">Current Status:</td>
              <td class="value">${escapeHtml(clientStatus)}</td>
            </tr>
            <tr>
              <td class="label">Website Needed:</td>
              <td class="value">${escapeHtml(clientType)}</td>
            </tr>
          </table>

          <!-- 2. User's Form Message/Notes -->
          <div class="section-title">What They Want Built</div>
          <div class="message-box">${escapeHtml(clientMessage)}</div>

          <!-- 3. Dedicated Antigravity Prototype Prompt Section -->
          <div class="section-title" style="color: #0f172a;">⚡ Antigravity Prototype Prompt</div>
          <div class="prompt-container">
            <div class="prompt-header">
              <span class="prompt-badge">Ready To Copy</span>
              <span class="prompt-hint">Triple-click or drag to select &amp; copy:</span>
            </div>
            <div class="prompt-text">${escapeHtml(antigravityPrompt)}</div>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${escapeHtml(email)}?subject=Re: Your Website Inquiry with LowensELEVATE" class="button">
              Reply to ${escapeHtml(clientName)} &rarr;
            </a>
          </div>
        </div>
        <div class="footer">
          Received at ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })} &bull; LowensELEVATE
        </div>
      </div>
    </body>
    </html>
  `;

  const recipient = process.env.NOTIFICATION_EMAIL || 'lowensweb@gmail.com';

  try {
    const { data, error } = await resend.emails.send({
      from: 'LowensELEVATE Applications <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject: `🚀 New Project Application: ${clientBusiness} (${clientName})`,
      html: htmlBody,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return { success: false, error: error.message || 'Failed to send email via Resend' };
    }

    return { success: true, data, deliveredTo: recipient };
  } catch (err) {
    console.error('[Resend Exception]:', err);
    return { success: false, error: err.message || 'Server error sending email' };
  }
}

/**
 * Serverless / Express request handler
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const { businessName, yourName, phone, email, websiteStatus, websiteType, vision, message } = req.body || {};

  const result = await sendApplicationEmail({
    businessName,
    yourName,
    phone,
    email,
    websiteStatus,
    websiteType,
    vision,
    message,
  });

  if (!result.success) {
    return res.status(500).json(result);
  }

  return res.status(200).json(result);
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

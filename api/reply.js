import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  const adminKey = req.headers.authorization;
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }

  try {
    const { to, subject, message } = req.body;

    if (!to || typeof to !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return res.status(400).json({
        success: false,
        error: 'Valid recipient email is required'
      });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Subject is required'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reply from Orzz Portfolio</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .message { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #667eea; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Reply from Orzz Portfolio</h1>
          <p>Response to your contact form submission</p>
        </div>
        <div class="content">
          <div class="message">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p>Best regards,<br>Orzz</p>
        </div>
        <div class="footer">
          <p>This email was sent from Orzz Portfolio contact system.</p>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Orzz Portfolio <contact@orzz.website>',
      to: to.trim(),
      subject: `Re: ${subject.trim()}`,
      html: emailHtml,
      replyTo: process.env.TO_EMAIL
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send reply'
      });
    }

    console.log('Reply sent:', data.id);
    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

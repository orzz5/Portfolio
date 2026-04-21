import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    const errors = {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Name is required';
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required';
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.subject = 'Subject is required';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors
      });
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #667eea; margin-bottom: 5px; }
          .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Someone has reached out through your portfolio contact form!</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${sanitizedData.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${sanitizedData.email}</div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${sanitizedData.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <div class="label">Time:</div>
            <div class="value">${new Date(sanitizedData.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your portfolio contact form.</p>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Orzz Portfolio <contact@orzz.website>',
      to: process.env.TO_EMAIL,
      subject: `📧 New Contact: ${sanitizedData.subject}`,
      html: emailHtml,
      replyTo: sanitizedData.email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send message'
      });
    }

    console.log('Email sent:', data.id);
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

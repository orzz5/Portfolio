// Vercel serverless function for contact form submission
// This endpoint handles POST requests to /api/contact

// Dynamic import for Resend to handle serverless environment
let Resend;
try {
  Resend = (await import('resend')).default;
} catch (importError) {
  console.error('Failed to import Resend:', importError);
  // Fallback for development
  Resend = class MockResend {
    async emails() {
      return {
        error: new Error('Resend package not available in serverless environment')
      };
    }
  };
}

export default async function handler(req, res) {
  // Add CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests for contact form
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    const { name, email, subject, projectType, message } = req.body;

    // Basic validation
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!email || typeof email !== 'string') {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters long';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Sanitize input data
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      projectType: projectType ? projectType.trim() : 'General Inquiry',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown'
    };

    // Initialize Resend with API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Create professional email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
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
            <div class="label">Project Type:</div>
            <div class="value">${sanitizedData.projectType}</div>
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
            <div class="label">Submission Details:</div>
            <div class="value">
              <small><strong>Time:</strong> ${new Date(sanitizedData.timestamp).toLocaleString()}</small><br>
              <small><strong>IP:</strong> ${sanitizedData.ip.split(',')[0].trim()}</small><br>
              <small><strong>User Agent:</strong> ${sanitizedData.userAgent}</small>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your portfolio contact form.</p>
        </div>
      </body>
      </html>
    `;

    // Check required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is required');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.'
      });
    }

    if (!process.env.TO_EMAIL) {
      console.error('TO_EMAIL environment variable is required');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.'
      });
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@orzz5.dev',
        to: process.env.TO_EMAIL,
        subject: `📧 New Contact: ${sanitizedData.subject}`,
        html: emailHtml,
        replyTo: sanitizedData.email
      });

      if (error) {
        console.error('Resend API error:', error);
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          statusCode: error.statusCode,
          response: error.response?.data
        });
        
        // Return more specific error message
        let errorMessage = 'Failed to send message. Please try again later.';
        
        if (error.statusCode === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (error.statusCode === 401) {
          errorMessage = 'Authentication failed. Please check API configuration.';
        } else if (error.statusCode === 403) {
          errorMessage = 'Permission denied. Please check sender email configuration.';
        } else if (error.message && error.message.includes('from')) {
          errorMessage = 'Invalid sender email. Please check FROM_EMAIL configuration.';
        }
        
        return res.status(500).json({
          success: false,
          message: errorMessage,
          debug: process.env.NODE_ENV === 'development' ? {
            error: error.message,
            statusCode: error.statusCode
          } : undefined
        });
      }

      console.log('Email sent successfully:', data);

      // Also log the submission for backup
      console.log('Contact form submission logged:', {
        ...sanitizedData,
        ip: sanitizedData.ip.split(',')[0].trim(),
        emailId: data?.id
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      console.error('Catch block error details:', {
        message: emailError.message,
        name: emailError.name,
        stack: emailError.stack
      });
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
        debug: process.env.NODE_ENV === 'development' ? {
          error: emailError.message,
          stack: emailError.stack
        } : undefined
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        timestamp: sanitizedData.timestamp
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}

// Enable CORS for the API endpoint
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

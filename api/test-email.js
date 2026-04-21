// Test endpoint to verify email configuration
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET.'
    });
  }

  try {
    // Check environment variables
    const config = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasToEmail: !!process.env.TO_EMAIL,
      hasFromEmail: !!process.env.FROM_EMAIL,
      resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
      toEmail: process.env.TO_EMAIL?.substring(0, 3) + '***', // Hide email for security
      fromEmail: process.env.FROM_EMAIL?.substring(0, 3) + '***' // Hide email for security
    };

    console.log('Email configuration test:', config);

    // Initialize Resend
    const resendClient = new Resend(process.env.RESEND_API_KEY);

    // Test Resend connection
    let resendTest = 'Not tested';
    if (process.env.RESEND_API_KEY && process.env.TO_EMAIL) {
      try {
        const { data, error } = await resendClient.emails.send({
          from: process.env.FROM_EMAIL || 'test@resend.dev',
          to: process.env.TO_EMAIL,
          subject: '📧 Email Configuration Test',
          html: `
            <h2>Email Configuration Test</h2>
            <p><strong>✅ Resend API Key:</strong> Configured</p>
            <p><strong>✅ TO Email:</strong> Configured</p>
            <p><strong>✅ FROM Email:</strong> ${process.env.FROM_EMAIL ? 'Configured' : 'Using default'}</p>
            <p><em>This is a test email to verify your email configuration is working.</em></p>
          `
        });

        if (error) {
          resendTest = `Failed: ${error.message}`;
        } else {
          resendTest = 'Success';
        }
      } catch (testError) {
      }
    } catch (testError) {
      testResult = `Error: ${testError.message}`;
    }

    res.status(200).json({
      success: true,
      message: 'Email configuration test completed',
      config,
      testResult,
      timestamp: new Date().toISOString(),
      instructions: config.hasFromEmail ? [
        '1. Verify your domain at resend.com/domains',
        '2. Add domain as verified sender in Resend dashboard',
        '3. Update FROM_EMAIL environment variable if needed'
      ] : [
        '1. Configure FROM_EMAIL environment variable',
        '2. Verify domain at resend.com/domains'
      ]
    });

  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
}

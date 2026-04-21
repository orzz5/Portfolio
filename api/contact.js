// Vercel serverless function for contact form submission
// This endpoint handles POST requests to /api/contact

export default async function handler(req, res) {
  // Only allow POST requests
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

    // Log the submission (in production, you would send this to an email service)
    console.log('Contact form submission:', {
      ...sanitizedData,
      ip: sanitizedData.ip.split(',')[0].trim() // Take only the first IP
    });

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example for future integration:
    /*
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hello@orzz5.dev',
      subject: `New Contact Form: ${sanitizedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Project Type:</strong> ${sanitizedData.projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message}</p>
        <hr>
        <p><small>Submitted: ${sanitizedData.timestamp}</small></p>
        <p><small>IP: ${sanitizedData.ip}</small></p>
      `
    });

    if (error) {
      console.error('Email sending failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
    */

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

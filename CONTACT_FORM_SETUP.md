# Contact Form System Documentation

## Overview
This portfolio includes a production-ready contact form system using Vercel serverless functions. The system is secure, scalable, and ready for email service integration.

## Project Structure

```
Portfolio-main/
|
|-- api/
|   |-- contact.js              # Vercel serverless function
|
|-- src/
|   |-- components/
|   |   |-- Contact.jsx         # React contact form component
|   |   |-- DiscordIcon.jsx      # Custom Discord icon
|   |   |-- DiscordPresence.jsx  # Discord presence widget
|   |   |-- ...other components
|
|-- vercel.json                 # Vercel configuration
|-- package.json
|-- vite.config.js
```

## Backend API Endpoint

### `/api/contact.js`
- **Method**: POST only
- **Content-Type**: application/json
- **Request Body**:
  ```json
  {
    "name": "string (min 2 chars)",
    "email": "string (valid email)",
    "subject": "string (min 3 chars)",
    "projectType": "string (optional)",
    "message": "string (min 10 chars)"
  }
  ```

- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Message sent successfully! I'll get back to you soon.",
    "data": {
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Response** (400/500):
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": {
      "name": "Name must be at least 2 characters long",
      "email": "Please enter a valid email address"
    }
  }
  ```

### Security Features
- Input validation and sanitization
- Rate limiting (can be added)
- CORS headers configured
- No email exposure in frontend
- IP and User-Agent logging

## Frontend Integration

### React Form Component (`Contact.jsx`)
- Uses `fetch()` API to communicate with backend
- Real-time validation feedback
- Loading states and error handling
- Form reset on successful submission
- User-friendly error messages

### Key Features
- **Loading State**: Shows spinner during submission
- **Success State**: Green confirmation message
- **Error State**: Red error messages with specific validation feedback
- **Auto-reset**: Form clears after successful submission

## Vercel Deployment

### Required Configuration
1. **vercel.json** - API routing and CORS configuration
2. **api/contact.js** - Serverless function (auto-detected)
3. **Build Command**: `npm run build` (already configured)
4. **Output Directory**: `dist` (already configured)

### Environment Variables (Optional)
For future email service integration:
```bash
# Example for Resend
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=hello@orzz5.dev
```

## Email Service Integration (ACTIVE)

### Resend Integration (Currently Implemented)
The contact form now uses **Resend** for email delivery with the following features:

#### Environment Variables Required:
```bash
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_sender_email
TO_EMAIL=your_destination_email
```

#### Email Features:
- **Professional HTML template** with responsive design
- **Secure email sending** via Resend API
- **Reply-to functionality** for easy responses
- **Submission details** (IP, timestamp, user agent)
- **Error handling** with proper logging
- **Rate limiting ready** (can be added)

#### Email Template:
- Modern gradient header matching portfolio design
- Organized field display with proper formatting
- Mobile-responsive layout
- Professional styling with Inter font
- Submission metadata for tracking

#### Current Configuration:
- **From**: Uses `process.env.FROM_EMAIL` or falls back to Resend default
- **To**: Uses `process.env.TO_EMAIL` or falls back to placeholder
- **Reply-To**: Set to submitter's email for easy response
- **Subject**: Includes emoji and contact subject line

### Other Email Services
- SendGrid
- Mailgun
- AWS SES
- Nodemailer (with SMTP)

## Testing

### Local Development
1. Run `npm run dev` for frontend
2. Test API with tools like Postman or curl:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### Production Testing
1. Deploy to Vercel
2. Test the live contact form
3. Check Vercel function logs for debugging

## Security Considerations

### Current Security Measures
- Input validation and sanitization
- CORS configuration
- No sensitive data in frontend
- Server-side processing only

### Recommended Enhancements
- Rate limiting (Vercel Edge Middleware)
- reCAPTCHA integration
- Email validation with MX record check
- Content Security Policy (CSP)

## Troubleshooting

### Common Issues
1. **404 Error**: Check `vercel.json` routing configuration
2. **CORS Error**: Verify headers in `vercel.json`
3. **500 Error**: Check Vercel function logs
4. **Form Not Submitting**: Check browser console for JavaScript errors

### Debugging
- Vercel Function Logs: Dashboard > Functions > Logs
- Browser Network Tab: Check API requests
- Console: Check for JavaScript errors

## Scalability

The system is designed to handle:
- High traffic volumes (Vercel auto-scaling)
- Multiple concurrent submissions
- Future email service integration
- Additional validation rules

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Verify API endpoint accessibility
3. Test with minimal data payload
4. Review browser developer tools

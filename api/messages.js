export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
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
    const mockMessages = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I would like to discuss a potential project with you.',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Collaboration Opportunity',
        message: 'Hi! I found your portfolio and would love to collaborate on a project.',
        timestamp: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    return res.status(200).json({
      success: true,
      messages: mockMessages
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

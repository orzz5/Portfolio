import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Lock, LogOut, User, MessageSquare, Clock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      loadMessages();
    }
  }, []);

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminKey === import.meta.env.VITE_ADMIN_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setError('');
      loadMessages();
    } else {
      setError('Invalid admin key');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setSelectedMessage(null);
    setMessages([]);
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': import.meta.env.VITE_ADMIN_KEY
        },
        body: JSON.stringify({
          to: selectedMessage.email,
          subject: `Re: ${selectedMessage.subject}`,
          message: replyText
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Reply sent successfully!');
        setReplyText('');
        setTimeout(() => {
          setSelectedMessage(null);
          setSuccess('');
        }, 2000);
      } else {
        setError(data.error || 'Failed to send reply');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 max-w-md w-full border border-purple-accent/20"
        >
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-purple-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-300">Enter your admin key to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Admin Key"
                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-accent/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-accent transition-colors"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-accent to-purple-glow text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-purple-accent" />
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 border border-purple-accent/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-accent" />
                Inbox ({messages.length})
              </h2>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No messages yet</p>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedMessage?.id === message.id
                          ? 'bg-purple-700/50 border border-purple-accent'
                          : 'bg-purple-900/30 hover:bg-purple-900/50 border border-purple-accent/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 text-purple-accent mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{message.name}</p>
                          <p className="text-gray-400 text-sm truncate">{message.subject}</p>
                          <p className="text-gray-500 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-effect rounded-2xl p-6 border border-purple-accent/20"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedMessage.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedMessage.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-2">Message:</h4>
                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-accent/20">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Reply:</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full h-32 px-4 py-3 bg-purple-900/50 border border-purple-accent/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-accent transition-colors resize-none"
                  />
                </div>

                {error && (
                  <div className="mb-4 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 text-green-400 text-sm bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                    {success}
                  </div>
                )}

                <button
                  onClick={handleSendReply}
                  disabled={isLoading || !replyText.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-accent to-purple-glow text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending...' : 'Send Reply'}
                </button>
              </motion.div>
            ) : (
              <div className="glass-effect rounded-2xl p-12 border border-purple-accent/20 text-center">
                <MessageSquare className="w-16 h-16 text-purple-accent mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Select a message from the inbox to view and reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

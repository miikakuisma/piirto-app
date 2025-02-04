'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all fields');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-6">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              rows={5}
              className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-center">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center">
              Failed to send message. Please try again or email us directly.
            </div>
          )}
        </form>

        <div className="bg-neutral-800 p-6 rounded-lg">
          <p className="text-lg mb-4">
            Email us directly at: <a href="mailto:piirto@tatami.dev" className="text-blue-400 hover:text-blue-300">piirto@tatami.dev</a>
          </p>
          <p className="text-lg">
            Follow us on Twitter: <a href="https://twitter.com/tatamidev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">@tatamidev</a>
          </p>
        </div>
      </div>
    </main>
  );
} 
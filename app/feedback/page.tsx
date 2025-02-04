'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }

      const data = await response.json();
      console.log('Email sent:', data);
      // Show success message and redirect
      alert('Thank you for your feedback!');
      window.location.href = '/';

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Send us Feedback</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors text-white"
              placeholder="Your name"
              required
              aria-label="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors text-white"
              placeholder="your@email.com"
              required
              aria-label="Your email address"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors text-white"
              placeholder="Your feedback message..."
              required
              aria-label="Your feedback message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Submit feedback"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </main>
  );
}

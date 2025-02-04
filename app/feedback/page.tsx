'use client';

import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Separator from '@radix-ui/react-separator';

type FeedbackType = 'bug' | 'feature' | 'general' | '';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: '' as FeedbackType,
    title: '',
    description: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (!formData.type || !formData.title || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Feedback: ${formData.type}`,
          email: formData.email || 'anonymous@user.com',
          message: `Title: ${formData.title}\n\nDescription: ${formData.description}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send feedback');
      }
      
      setStatus('success');
      setFormData({ type: '', title: '', description: '', email: '' });
      setTimeout(() => {
        setStatus('idle');
        window.location.href = '/';
      }, 5000);
    } catch (error) {
      console.error('Error sending feedback:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Feedback</h1>
        <p className="text-lg mb-6">
          Help us improve Piirto by sharing your thoughts and experiences.
        </p>

        <Form.Root onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="space-y-4">
            <Form.Field name="type">
              <Form.Label className="text-sm font-medium mb-2 block">
                Feedback Type *
              </Form.Label>
              <RadioGroup.Root
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as FeedbackType }))}
                className="flex flex-col space-y-2"
                required
              >
                {[
                  { value: 'bug', label: 'Bug Report' },
                  { value: 'feature', label: 'Feature Request' },
                  { value: 'general', label: 'General Feedback' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <RadioGroup.Item
                      value={option.value}
                      id={option.value}
                      className="w-4 h-4 rounded-full border border-neutral-400 mr-2 flex items-center justify-center hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-blue-500" />
                    </RadioGroup.Item>
                    <label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            </Form.Field>

            <Separator.Root className="h-px bg-neutral-800" />

            <Form.Field name="title">
              <div className="space-y-2">
                <Form.Label className="text-sm font-medium">
                  Title *
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="Brief summary of your feedback"
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="text-red-400 text-sm">
                  Please enter a title
                </Form.Message>
              </div>
            </Form.Field>

            <Form.Field name="description">
              <div className="space-y-2">
                <Form.Label className="text-sm font-medium">
                  Description *
                </Form.Label>
                <Form.Control asChild>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={5}
                    placeholder="Please provide details about your feedback"
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="text-red-400 text-sm">
                  Please enter a description
                </Form.Message>
              </div>
            </Form.Field>

            <Form.Field name="email">
              <div className="space-y-2">
                <Form.Label className="text-sm font-medium">
                  Email (optional)
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="If you'd like us to follow up"
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </Form.Control>
                <Form.Message match="typeMismatch" className="text-red-400 text-sm">
                  Please enter a valid email
                </Form.Message>
              </div>
            </Form.Field>
          </div>

          <Form.Submit asChild>
            <button
              disabled={status === 'sending'}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {status === 'sending' ? 'Sending...' : 'Submit Feedback'}
            </button>
          </Form.Submit>

          {status === 'success' && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-center">
              Thank you for your feedback! We appreciate your input.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center">
              Failed to send feedback. Please try again later.
            </div>
          )}
        </Form.Root>
      </div>
    </main>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service for Piirto iOS App</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-8">Last Updated: 4th of February 2025</p>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h3>
            <p className="text-gray-300">
              By downloading, installing, or using Piirto (&quot;the App&quot;), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you do not have permission to access the App.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">2. Description of Service</h3>
            <p className="text-gray-300 mb-4">
              Piirto is an iOS application that allows users to create and enhance drawings using artificial intelligence technology. The App includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Drawing tools and canvas</li>
              <li>AI-powered image enhancement</li>
              <li>In-app purchases for generation credits</li>
              <li>Image saving and sharing capabilities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">3. User Content</h3>
            <div className="space-y-4 text-gray-300">
              <p>3.1. You retain all rights to your original drawings and artwork created within the App.</p>
              <p>3.2. By using our AI enhancement feature, you grant us permission to process your artwork for the purpose of generating enhanced versions.</p>
              <p>3.3. You agree not to create or enhance content that:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Infringes on others&apos; intellectual property rights</li>
                <li>Contains explicit, offensive, or inappropriate material</li>
                <li>Violates any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">4. In-App Purchases</h3>
            <div className="space-y-4 text-gray-300">
              <p>4.1. The App offers consumable in-app purchases for generation credits.</p>
              <p>4.2. All purchases are final and non-refundable, except as required by law.</p>
              <p>4.3. Credits are consumed when using AI enhancement features.</p>
              <p>4.4. Unused credits remain valid until used.</p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">5. Limitations of Use</h3>
            <div className="text-gray-300">
              <p className="mb-4">5.1. You agree not to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Use the App for any illegal purposes</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">6. Intellectual Property</h3>
            <p className="text-gray-300">
              6.1. The App, including its original content, features, and functionality, is owned by Tatami Tuotanto Oy and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h3>
            <div className="space-y-4 text-gray-300">
              <p>7.1. The App is provided &quot;as is&quot; without any warranties.</p>
              <p>7.2. We do not guarantee that:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>The AI enhancements will meet your specific expectations</li>
                <li>The App will be uninterrupted or error-free</li>
                <li>Any errors will be corrected</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h3>
            <p className="text-gray-300">
              8.1. Tatami Tuotanto Oy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the App.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">9. Changes to Terms</h3>
            <p className="text-gray-300">
              9.1. We reserve the right to modify these terms at any time. We will notify users of any material changes.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">10. Contact Information</h3>
            <p className="text-gray-300">
              For questions about these Terms, or for the App feedback, please contact us at piirto@tatami.dev.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 
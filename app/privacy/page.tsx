'use client';

import * as Accordion from '@radix-ui/react-accordion';
import ChevronIcon from '../components/ChevronIcon';
import PolicyLayout from '../components/PolicyLayout';
import * as Separator from '@radix-ui/react-separator';

export default function PrivacyPage() {
  return (
    <PolicyLayout>
      <h1 className="text-4xl font-bold mb-6">Privacy Policy for Piirto iOS App</h1>
      <p className="text-gray-400 mb-8">Last Updated: 4th of February 2025</p>

      <Accordion.Root type="multiple" className="space-y-4">
        <Accordion.Item value="intro" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">1. Introduction</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              This Privacy Policy explains how Piirto (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and protects your information when you use our iOS application.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="collection" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">2. Information We Collect</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4 space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">2.1. Information You Provide</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>User-created drawings and artwork</li>
                <li>In-app purchase transactions</li>
                <li>App usage preferences</li>
              </ul>
            </div>

            <Separator.Root className="h-px bg-neutral-700" />

            <div>
              <h4 className="text-lg font-medium mb-2">2.2. Automatically Collected Information</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Device information (model, iOS version)</li>
                <li>App usage statistics</li>
                <li>Performance data</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="usage" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">3. How We Use Your Information</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4 space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">3.1. Your Artwork</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>To provide AI enhancement features</li>
                <li>Artwork is processed temporarily and not permanently stored on Open AI servers</li>
                <li>Original and enhanced images are stored locally on your device</li>
              </ul>
            </div>

            <Separator.Root className="h-px bg-neutral-700" />

            <div>
              <h4 className="text-lg font-medium mb-2">3.2. Usage Data</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>To improve app performance</li>
                <li>To debug technical issues</li>
                <li>To enhance user experience</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="storage" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">4. Data Storage and Security</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4 space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">4.1. Local Storage</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Your artwork is stored locally on your device</li>
                <li>Credit balance is stored securely on your device</li>
                <li>App preferences are stored locally</li>
              </ul>
            </div>

            <Separator.Root className="h-px bg-neutral-700" />

            <div>
              <h4 className="text-lg font-medium mb-2">4.2. Server Processing</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Artwork is temporarily processed through secure servers when using AI enhancement</li>
                <li>No permanent storage of processed images on our servers</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="sharing" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">5. Data Sharing</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              We do not sell or share your personal data. Your artwork is only processed for the purpose of providing AI enhancements.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="children" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">6. Children&apos;s Privacy</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              The App is not intended for children under 4.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="rights" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">7. Your Rights</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4 space-y-4">
            <p className="text-gray-300 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Delete your data by uninstalling the App</li>
              <li>Request information about your data usage</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="changes" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">8. Changes to This Policy</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              We may update this Privacy Policy periodically. We will notify users of any material changes.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="contact" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">9. Contact Us</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              If you have questions about this Privacy Policy, please contact us at piirto@tatami.dev.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="california" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">10. California Privacy Rights</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              California residents may have additional rights regarding their personal information under the CCPA.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="international" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">11. International Users</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4">
            <p className="text-gray-300">
              By using the App, you consent to the transfer of your data to the United States for processing by Open AI services.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="ai" className="bg-neutral-800/50 rounded-lg">
          <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
            <span className="text-xl font-semibold">12. AI Processing in Piirto</span>
            <ChevronIcon />
          </Accordion.Trigger>
          <Accordion.Content className="px-6 py-4 space-y-4">
            <section className="mb-6">
              <h4 className="text-lg font-semibold mb-3">1. How Our AI Processing Works</h4>
              <div className="text-gray-300 space-y-2">
                <p className="font-medium">1.1. Image Processing Flow</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>When you submit a drawing for enhancement, it is temporarily uploaded to Open AI secure servers</li>
                  <li>The image is processed using OpenAI&apos;s API</li>
                  <li>The enhanced result is returned to your device</li>
                  <li>Original and processed images are stored only on your device</li>
                  <li>Server-side data is automatically deleted after processing</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h4 className="text-lg font-semibold mb-3">2. AI Technology</h4>
              <div className="text-gray-300 space-y-2">
                <p className="font-medium">2.1. We utilize:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>OpenAI&apos;s image generation models</li>
                  <li>Advanced image recognition to determine drawing type</li>
                  <li>Context-aware enhancement algorithms</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h4 className="text-lg font-semibold mb-3">3. Data Usage in AI Processing</h4>
              <div className="text-gray-300 space-y-4">
                <div>
                  <p className="font-medium">3.1. What We Process:</p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Your original drawing</li>
                    <li>Drawing style and type information</li>
                    <li>Basic image metadata (size, format)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">3.2. What We Don&apos;t Process:</p>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Personal information</li>
                    <li>Device data</li>
                    <li>Location data</li>
                    <li>User identification</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h4 className="text-lg font-semibold mb-3">4. AI Processing Limitations</h4>
              <ul className="list-disc list-inside pl-4 text-gray-300 space-y-2">
                <li>Processing is limited to artistic enhancement</li>
                <li>No behavioral or personal data analysis</li>
                <li>No user profiling or pattern recognition</li>
                <li>No data retention for training purposes</li>
              </ul>
            </section>

            <section className="mb-6">
              <h4 className="text-lg font-semibold mb-3">5. Quality and Safety Measures</h4>
              <div className="text-gray-300 space-y-2">
                <p className="font-medium">5.1. We implement:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Content filtering for inappropriate content</li>
                  <li>Style preservation algorithms</li>
                  <li>Original artwork protection</li>
                  <li>Secure data transmission</li>
                </ul>
              </div>
            </section>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </PolicyLayout>
  );
} 
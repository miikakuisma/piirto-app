'use client';

import * as Accordion from '@radix-ui/react-accordion';
import * as ScrollArea from '@radix-ui/react-scroll-area';
// import * as Separator from '@radix-ui/react-separator';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <ScrollArea.Root className="h-[calc(100vh-4rem)] w-full">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Terms of Service for Piirto iOS App</h1>
            <p className="text-gray-400 mb-8">Last Updated: 4th of February 2025</p>

            <Accordion.Root type="multiple" className="space-y-4">
              <Accordion.Item value="acceptance" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">1. Acceptance of Terms</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300">
                    By downloading, installing, or using Piirto (&quot;the App&quot;), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you do not have permission to access the App.
                  </p>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="description" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">2. Description of Service</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300 mb-4">
                    Piirto is an iOS application that allows users to create and enhance drawings using artificial intelligence technology. The App includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Drawing tools and canvas</li>
                    <li>AI-powered image enhancement</li>
                    <li>In-app purchases for generation credits</li>
                    <li>Image saving and sharing capabilities</li>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="userContent" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">3. User Content</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
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
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="inAppPurchases" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">4. In-App Purchases</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <div className="space-y-4 text-gray-300">
                    <p>4.1. The App offers consumable in-app purchases for generation credits.</p>
                    <p>4.2. All purchases are final and non-refundable, except as required by law.</p>
                    <p>4.3. Credits are consumed when using AI enhancement features.</p>
                    <p>4.4. Unused credits remain valid until used.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="limitations" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">5. Limitations of Use</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <div className="text-gray-300">
                    <p className="mb-4">5.1. You agree not to:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                      <li>Use the App for any illegal purposes</li>
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="intellectualProperty" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">6. Intellectual Property</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300">
                    6.1. The App, including its original content, features, and functionality, is owned by Tatami Tuotanto Oy and is protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="disclaimer" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">7. Disclaimer of Warranties</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <div className="space-y-4 text-gray-300">
                    <p>7.1. The App is provided &quot;as is&quot; without any warranties.</p>
                    <p>7.2. We do not guarantee that:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                      <li>The AI enhancements will meet your specific expectations</li>
                      <li>The App will be uninterrupted or error-free</li>
                      <li>Any errors will be corrected</li>
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="limitation" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">8. Limitation of Liability</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300">
                    8.1. Tatami Tuotanto Oy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the App.
                  </p>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="changes" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">9. Changes to Terms</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300">
                    9.1. We reserve the right to modify these terms at any time. We will notify users of any material changes.
                  </p>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="contact" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">10. Contact Information</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <p className="text-gray-300">
                    For questions about these Terms, or for the App feedback, please contact us at piirto@tatami.dev.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-neutral-800 transition-colors duration-150 ease-out hover:bg-neutral-700 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-neutral-600 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </main>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
} 
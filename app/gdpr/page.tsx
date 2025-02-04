'use client';

import * as Accordion from '@radix-ui/react-accordion';
import * as ScrollArea from '@radix-ui/react-scroll-area';
// import * as Separator from '@radix-ui/react-separator';

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <ScrollArea.Root className="h-[calc(100vh-4rem)] w-full">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">GDPR Compliance</h1>
            <p className="text-gray-400 mb-8">Last Updated: 4th of February 2025</p>

            <Accordion.Root type="multiple" defaultValue={["rights"]} className="space-y-4">
              <Accordion.Item value="rights" className="bg-neutral-800/50 rounded-lg">
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 rounded-lg transition-colors">
                  <span className="text-xl font-semibold">Your Rights Under GDPR</span>
                  <ChevronIcon />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4">
                  <div className="space-y-4 text-gray-300">
                    <p>Under GDPR, you have the following rights:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Right to access your personal data</li>
                      <li>Right to rectification</li>
                      <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                      <li>Right to restrict processing</li>
                      <li>Right to data portability</li>
                      <li>Right to object</li>
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Add more sections as needed */}
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
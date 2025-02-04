'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <ScrollArea.Root className="h-[calc(100vh-4rem)] w-full">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="max-w-3xl mx-auto">
            {children}
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
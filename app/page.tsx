/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react';
import { CanvasControls } from './components/CanvasControls';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'tatami-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'paper-width'?: string;
        'paper-height'?: string;
        'paper-color'?: string;
      };
    }
  }
}
  
interface TatamiAPI {
  saveCurrentImage(): unknown;
  centerCanvas: () => void;
  zoom: (scale: number, x: number, y: number) => void;
  setBrushSize: (size: number) => void;
  setColor: (color: string) => void;
  clearAll: () => void;
  setBrushOpacity: (opacity: number) => void;
}

interface Tatami {
  api: TatamiAPI;
  utils: {
    loadAsset(options: { src: string }): Promise<unknown>;
    loadBrushPackage: (options: { url: string }) => void;
  };
}

declare global {
  interface Window {
    tatami: Tatami;
  }
}

export default function Home() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [selectedColor, setSelectedColor] = React.useState('#000000');
  const [selectedBrushSize, setSelectedBrushSize] = React.useState(10);
  const [brushOpacity, setBrushOpacity] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [magicResult, setMagicResult] = useState<{
    originalDescription?: string;
    enhancedPrompt?: string;
    generatedImage?: string;
  } | null>(null);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio
    });
    window.addEventListener("message", launchStuff);

    return () => {
      window.removeEventListener("message", launchStuff);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface LaunchMessage extends MessageEvent {
    data: {
      tatami: string;
    };
  }

  const launchStuff = (e: LaunchMessage) => {
    if (e.data.tatami === 'ready') {
      setTimeout(async () => {
        // window.tatami.api.zoom(1.25, window.innerWidth / 2, window.innerHeight / 2);
        // Load brush package
        await window.tatami.utils.loadBrushPackage({
          url: 'https://cdn.sumo.app/brush_packages/brushes/plain_sharp.lzma',
        })
        // Set brush size and color
        await window.tatami.api.setBrushSize(10 * window.devicePixelRatio);
        await window.tatami.api.setColor('#000000');
        setIsLoading(false);
      }, 100);
    }
  };

  const handleBrushSizeChange = (size: number) => {
    window.tatami.api.setBrushSize(size * window.devicePixelRatio);
    setSelectedBrushSize(size);
  };

  const handleColorChange = (color: string) => {
    window.tatami.api.setColor(color);
    setSelectedColor(color);
  };

  const handleOpacityChange = (opacity: number) => {
    window.tatami.api.setBrushOpacity(opacity);
    setBrushOpacity(opacity);
  };

  const handleMagicClick = async () => {
    console.log('handleMagicClick');
    if (!window.tatami?.api) return;
    
    setIsLoading(true);

    try {
      const imageBlob = await window.tatami.api.saveCurrentImage() as Blob;
      const image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
      });

      const response = await fetch('/api/magic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) throw new Error('Failed to process image');

      const result = await response.json();
      
      // Proxy the generated image
      const proxyResponse = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: result.generatedImage }),
      });

      if (!proxyResponse.ok) throw new Error('Failed to proxy image');
      
      const { dataUrl } = await proxyResponse.json();
      
      window.tatami.utils.loadAsset({
        src: dataUrl,
      });

      setMagicResult(result);

    } catch (error) {
      console.error('Error processing magic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-screen h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-500 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Loading Canvas...</p>
          </div>
        </div>
      )}
      <tatami-canvas
        paper-width={Math.min(dimensions.width, dimensions.height).toString()}
        paper-height={Math.min(dimensions.width, dimensions.height).toString()}
        paper-color="#ffffff"
      ></tatami-canvas>

      <CanvasControls 
        selectedColor={selectedColor}
        selectedBrushSize={selectedBrushSize}
        brushOpacity={brushOpacity}
        isLoading={isLoading}
        onBrushSizeChange={handleBrushSizeChange}
        onOpacityChange={handleOpacityChange}
        onColorChange={handleColorChange}
        onClear={() => window.tatami.api.clearAll()}
        onMagicClick={handleMagicClick}
      />
    </main>
  );
}

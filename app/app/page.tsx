/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react';
import { CanvasControls } from '../components/CanvasControls';

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
  undo(): unknown;
  redo(): unknown;
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
    limitImageSize(arg0: { url: string; maxSize: number; }): unknown;
    loadAsset(options: { src: string }): Promise<unknown>;
    loadBrushPackage: (options: { url: string }) => void;
    hslToRgb: (h: number, s: number, l: number) => [number, number, number];
    rgbToHex: (rgb: { r: number; g: number; b: number }) => string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [magicResult, setMagicResult] = useState<{
    originalDescription?: string;
    enhancedPrompt?: string;
    generatedImage?: string;
  } | null>(null);
  const [isCanvasDirty, setIsCanvasDirty] = useState(false);
  const [hasMagicBeenUsed, setHasMagicBeenUsed] = useState(false);
  const [isMagicAvailable, setIsMagicAvailable] = useState(false);
  const [hasDrawnWithColor, setHasDrawnWithColor] = useState(false);

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
      [x: string]: string;
      tatami: string;
    };
  }

  const launchStuff = (e: LaunchMessage) => {
    // console.log(e.data)
    if (e.data.tatami === 'ready') {
      setTimeout(async () => {
        // window.tatami.api.zoom(1.25, window.innerWidth / 2, window.innerHeight / 2);
        // Load brush package
        await window.tatami.utils.loadBrushPackage({
          url: 'https://cdn.sumo.app/brush_packages/brushes/plain_sharp.lzma',
        })
        // Set brush size and color
        await window.tatami.api.setBrushSize(10 * window.devicePixelRatio);
        await window.tatami.api.setColor('#0095ff');
        setIsLoading(false);
      }, 100);
    }
    if (e.data.command === 'layers_changed') {
      // console.log('layers_changed, setting isCanvasDirty to true')
      setIsCanvasDirty(true);
      setIsMagicAvailable(true);
      setHasDrawnWithColor(true);
      setTimeout(() => setHasDrawnWithColor(false), 100);
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
    if (!window.tatami?.api) return;
    
    setIsLoading(true);
    setHasMagicBeenUsed(true);

    const maxRetries = 2;
    let currentTry = 0;

    while (currentTry <= maxRetries) {
      try {
        const imageBlob = await window.tatami.api.saveCurrentImage() as Blob;
        const imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });

        const resizedImage = await window.tatami.utils.limitImageSize({
          url: imageBase64 as string,
          maxSize: 1024
        })

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes timeout

        const response = await fetch('/api/magic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: (resizedImage as { base64: string }).base64 }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 504) {
            if (currentTry < maxRetries) {
              currentTry++;
              continue; // Try again
            }
          }
          throw new Error(`Failed to process image: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.generatedImage) {
          throw new Error('No generated image in response');
        }

        // Proxy the generated image
        const proxyResponse = await fetch('/api/proxy-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: result.generatedImage }),
        });

        if (!proxyResponse.ok) {
          throw new Error('Failed to proxy image');
        }
        
        const { dataUrl } = await proxyResponse.json();
        
        await window.tatami.utils.loadAsset({
          src: dataUrl,
        });

        setMagicResult(result);
        break; // Success, exit loop

      } catch (error) {
        console.error('Error processing magic:', error);
        if (currentTry === maxRetries) {
          alert('The magic is taking longer than expected. Please try again in a moment.');
        }
        currentTry++;
      }
    }

    setIsLoading(false);
    if (currentTry > maxRetries) {
      setHasMagicBeenUsed(false); // Allow retry only on complete failure
    }
  };

  const handleShare = async () => {
    const imageBlob = await window.tatami.api.saveCurrentImage() as Blob;
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
    const file = new File([imageBlob], uniqueFileName, { type: 'image/jpeg' });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', uniqueFileName);

    const response = await fetch('/api/share', {
      method: 'POST',
      body: formData,  // Remove Content-Type header - browser will set it automatically with boundary
    });

    if (!response.ok) throw new Error('Failed to share image');
    
    const data = await response.json();
    setIsCanvasDirty(false); // Reset dirty flag after successful share
    return data.url;
  };

  const handleClear = () => {
    window.tatami.api.clearAll();
    setTimeout(() => {
      setHasMagicBeenUsed(false);
      setIsMagicAvailable(false);
      setIsCanvasDirty(false);
    }, 500);
  };

  return (
    <main className="relative w-screen h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-500 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 bottom-24 z-0">
        <tatami-canvas
          paper-width='1920'
          paper-height='1080'
          paper-color="#ffffff"
        ></tatami-canvas>
      </div>

      <CanvasControls 
        selectedColor={selectedColor}
        selectedBrushSize={selectedBrushSize}
        brushOpacity={brushOpacity}
        isLoading={isLoading}
        onBrushSizeChange={handleBrushSizeChange}
        onOpacityChange={handleOpacityChange}
        onColorChange={handleColorChange}
        onClear={handleClear}
        onMagicClick={handleMagicClick}
        onShare={handleShare}
        isDirty={isCanvasDirty}
        hasMagicBeenUsed={hasMagicBeenUsed}
        isMagicAvailable={isMagicAvailable}
        hasDrawnWithColor={hasDrawnWithColor}
      />
    </main>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect } from 'react';
import { BrushButton } from './components/BrushButton';
import { ColorButton } from './components/ColorButton';
import { TrashButton } from './components/TrashButton';
import { BrushControls } from './components/BrushControls';

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
  const [isLoading, setIsLoading] = React.useState(true);

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

  const brushSizes = [
    { size: 10, padding: 'p-2.5' },
    { size: 30, padding: 'p-5' },
    { size: 50, padding: 'p-7' },
  ];

  const colors = ['#dc2626', '#d97706', '#16a34a', '#0284c7', '#7c3aed', '#c026d3', '#db2777', '#475569', '#ffffff', '#000000'];

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

  return (
    <>
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
        paper-width={dimensions.width.toString()}
        paper-height={dimensions.height.toString()}
        paper-color="#ffffff"
      ></tatami-canvas>

      <div className="fixed bottom-0 z-10 flex items-center p-2 justify-center w-full flex-wrap">
        <div className="flex items-center">
          <BrushControls 
            size={selectedBrushSize}
            opacity={brushOpacity}
            onSizeChange={handleBrushSizeChange}
            onOpacityChange={handleOpacityChange}
          />
        </div>
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            isSelected={selectedColor === color}
            onClick={() => handleColorChange(color)}
          />
        ))}
        <TrashButton onClick={() => window.tatami.api.clearAll()} />
      </div>
    </>
  );
}

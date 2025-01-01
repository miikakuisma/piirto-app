/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect } from 'react';

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
      }, 100);
    }
  };

  const SmallBrush = () => {
    return (
      <div
        className={`rounded-full p-2.5 m-2 cursor-pointer`}
        style={{
          backgroundColor: '#000000',
        }}
        onClick={() => {
          window.tatami.api.setBrushSize(10);
        }}
      ></div>
    );
  }

  const LargeBrush = () => {
    return (
      <div
        className={`rounded-full p-7 m-2 cursor-pointer`}
        style={{
          backgroundColor: '#000000',
        }}
        onClick={() => {
          window.tatami.api.setBrushSize(50);
        }}
      ></div>
    );
  }

  const ColorButton = ({ color }: { color: string }) => {
    return (
      <div
        className={`rounded-full p-5 m-2 cursor-pointer`}
        style={{
          backgroundColor: color,
          border: selectedColor === color ? '3px solid #fff' : '3px solid #666',
        }}
        onClick={() => {
          window.tatami.api.setColor(color);
          setSelectedColor(color);
        }}
      ></div>
    );
  }

  const TrashButton = () => {
    return (
      <div
        className={`absolute right-3 bottom-3 rounded-full m-2 cursor-pointer ml-10`}
        onClick={() => {
          window.tatami.api.clearAll()
        }}
      >
        <svg color="#ffffff" viewBox="0 0 256 256" width="36" height="36" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M64,112V40a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v72" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="96" x2="112" y1="64" y2="64"/><path d="M216,112a88,88,0,0,1-176,0Z" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M93.6,193l-4.3,29.9a8,8,0,0,0,7.9,9.1h61.6a8,8,0,0,0,7.9-9.1L162.4,193" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
      </div>
    )
  }

  const colorButtons = ['#dc2626', '#d97706', '#16a34a', '#0284c7', '#7c3aed', '#c026d3', '#db2777', '#475569', '#ffffff', '#000000'].map((color) => {
    return <ColorButton key={color} color={color} />;
  });

  return (<>
    <tatami-canvas
      paper-width={dimensions.width.toString()}
      paper-height={dimensions.height.toString()}
      paper-color="#ffffff"
    ></tatami-canvas>

    <div className="fixed bottom-0 z-10 flex items-center p-2 justify-center w-auto w-full flex-wrap">
      {colorButtons}
      <TrashButton />
    </div>
  </>);
}

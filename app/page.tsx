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
      setBrushSize: (size: number) => void;
    }
  }
}

interface TatamiAPI {
  zoom: (scale: number, x: number, y: number) => void;
  setBrushSize: (size: number) => void;
  setColor: (color: string) => void;
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
  useEffect(() => {
    window.addEventListener("message", launchStuff)

    return () => {
      window.removeEventListener("message", launchStuff)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  interface LaunchMessage extends MessageEvent {
    data: {
      tatami: string;
    };
  }

  const launchStuff = (e: LaunchMessage) => {
    console.log(e.data);
    if (e.data.tatami === 'ready') {
      setTimeout(async () => {
        window.tatami.api.zoom(1.25, window.innerWidth / 2, window.innerHeight / 2);

        await window.tatami.utils.loadBrushPackage({
          url: 'https://cdn.sumo.app/brush_packages/brushes/plain_sharp.lzma',
        })

        await window.tatami.api.setBrushSize(10);

      }, 100);
    }
  };

  const ColorButton = ({ color }: { color: string }) => {
    return (
      <div
        className={`rounded-full p-8 m-2 cursor-pointer`}
        style={{
          backgroundColor: color,
          border: '4px solid #ccc',
        }}
        onClick={() => {
          console.log(color);
          window.tatami.api.setColor(color);
        }}
      ></div>
    );
  }

  const colorButtons = ['#dc2626', '#d97706', '#16a34a', '#0284c7', '#7c3aed', '#c026d3', '#db2777', '#475569', '#ffffff', '#000000'].map((color) => {
    return <ColorButton key={color} color={color} />;
  });

  return (<>
    <tatami-canvas
      paper-width={window.innerWidth.toString()}
      paper-height={window.innerHeight.toString()}
      paper-color="#ffffff"
    ></tatami-canvas>

    <div className="fixed bottom-0 z-10 flex items-center justify-center w-auto p-10 w-full flex-wrap">
      {colorButtons}
    </div>
  </>);
}

import { useCallback, useRef, useState } from 'react';

interface ColorBarProps {
  onColorChange: (color: string) => void;
}

export const ColorBar = ({ onColorChange }: ColorBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentHue, setCurrentHue] = useState(0);

  const handleColorChange = useCallback((clientX: number) => {
    if (!barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percentage = x / rect.width;
    
    const hue = Math.round(percentage * 360);
    setCurrentHue(percentage * 100); // Store as percentage for positioning
    
    const rgbArray = window.tatami.utils.hslToRgb((100/360) * hue / 100, 1, 0.5);
    const color = '#' + window.tatami.utils.rgbToHex({ r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] });
    
    onColorChange(color);
  }, [onColorChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleColorChange(e.clientX);
  }, [handleColorChange]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDragging) {
      handleColorChange(e.clientX);
    }
  }, [isDragging, handleColorChange]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div className="fixed bottom-0 w-full p-4 flex justify-center">
      <div className="relative w-full max-w-3xl">
        <div
          ref={barRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="h-8 rounded-full cursor-pointer touch-none"
          style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
          }}
        />
        <div 
          className="absolute top-0 -mt-2 transform -translate-x-1/2"
          style={{ left: `${currentHue}%` }}
        >
          <div className="w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-white" />
        </div>
      </div>
    </div>
  );
}; 
import { useCallback, useRef, useState, useEffect } from 'react';

interface ColorBarProps {
  onColorChange: (color: string) => void;
}

export const ColorBar = ({ onColorChange }: ColorBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentHue, setCurrentHue] = useState(58);
  const [currentY, setCurrentY] = useState(50); // Default to middle

  const handleColorChange = useCallback((clientX: number, clientY: number) => {
    if (!barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    
    const xPercentage = x / rect.width;
    const yPercentage = y / rect.height;
    
    const hue = Math.round(xPercentage * 360);
    setCurrentHue(xPercentage * 100);
    setCurrentY(yPercentage * 100);
    
    // Convert Y position to saturation and lightness
    // Top = bright (high saturation, high lightness)
    // Bottom = dark (high saturation, low lightness)
    // Middle = pure color (high saturation, medium lightness)
    // const saturation = 100;
    const lightness = 100 - (yPercentage * 100);
    
    const rgbArray = window.tatami.utils.hslToRgb((100/360) * hue / 100, 1, lightness / 100);
    const color = '#' + window.tatami.utils.rgbToHex({ r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] });
    
    onColorChange(color);
  }, [onColorChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.setPointerCapture(e.pointerId);
    handleColorChange(e.clientX, e.clientY);
  }, [handleColorChange]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDragging) {
      handleColorChange(e.clientX, e.clientY);
    }
  }, [isDragging, handleColorChange]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    document.body.releasePointerCapture(e.pointerId);
  }, []);

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => handlePointerMove(e as unknown as React.PointerEvent);
    const handleGlobalPointerUp = (e: PointerEvent) => handlePointerUp(e as unknown as React.PointerEvent);

    document.addEventListener('pointermove', handleGlobalPointerMove);
    document.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      document.removeEventListener('pointermove', handleGlobalPointerMove);
      document.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div className="flex justify-center w-1/2 relative">
      <div className="w-full">
        <div
          ref={barRef}
          onPointerDown={handlePointerDown}
          className="h-16 rounded-lg cursor-pointer touch-none"
          style={{
            background: 
              'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.9) 100%), ' +
              'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
          }}
        />
        <div 
          onPointerDown={handlePointerDown}
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ 
            left: `${currentHue}%`,
            top: `${currentY}%`
          }}
        />
      </div>
    </div>
  );
}; 
import { useState, useRef, useEffect } from 'react';
import { PaintBrushIcon } from '@heroicons/react/24/outline';

interface BrushControlsProps {
  size: number;
  opacity: number;
  onSizeChange: (size: number) => void;
  onOpacityChange: (opacity: number) => void;
}

export const BrushControls = ({ size, opacity, onSizeChange, onOpacityChange }: BrushControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        className="rounded-full p-2 mr-3 cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PaintBrushIcon className="w-6 h-6 text-white" />
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute bottom-full mb-2 bg-white rounded-lg p-4 shadow-lg"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <label className="text-sm text-gray-600">Size</label>
              <input
                type="range"
                min="1"
                max="100"
                value={size}
                onChange={(e) => onSizeChange(Number(e.target.value))}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-black text-sm">{size}px</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <label className="text-sm text-gray-600">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity * 100}
                onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-black text-sm">{Math.round(opacity * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
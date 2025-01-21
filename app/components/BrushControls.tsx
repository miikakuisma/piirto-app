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
    <>
      <div
        ref={buttonRef}
        className="relative rounded-full w-12 h-12 min-w-12 min-h-12 p-2 mr-3 cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PaintBrushIcon className="w-8 h-8 min-w-8 min-h-8 p-1 text-white" />

        {isOpen && (
          <div
            ref={popupRef}
            className="absolute bottom-20 left-0 mb-2 bg-slate-800 rounded-lg p-4 border border-slate-600 shadow-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-100">Size</label>
                <input
                  type="range"
                  min="1"
                  max="256"
                  value={size}
                  onChange={(e) => onSizeChange(Number(e.target.value))}
                  className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-500 text-sm">{size}px</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-100">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity * 100}
                  onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
                  className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-500 text-sm">{Math.round(opacity * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}; 
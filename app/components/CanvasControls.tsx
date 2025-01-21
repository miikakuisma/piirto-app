import { BrushControls } from './BrushControls';
import { ColorButton } from './ColorButton';
import { TrashButton } from './TrashButton';
import { MagicButton } from './MagicButton';

interface CanvasControlsProps {
  selectedColor: string;
  selectedBrushSize: number;
  brushOpacity: number;
  isLoading: boolean;
  onBrushSizeChange: (size: number) => void;
  onOpacityChange: (opacity: number) => void;
  onColorChange: (color: string) => void;
  onClear: () => void;
  onMagicClick: () => void;
}

export const CanvasControls = ({
  selectedColor,
  selectedBrushSize,
  brushOpacity,
  isLoading,
  onBrushSizeChange,
  onOpacityChange,
  onColorChange,
  onClear,
  onMagicClick,
}: CanvasControlsProps) => {
  const colors = ['#dc2626', '#d97706', '#16a34a', '#0284c7', '#7c3aed', '#c026d3', '#db2777', '#475569', '#ffffff', '#000000'];

  return (
    <>
      <BrushControls 
        size={selectedBrushSize}
        opacity={brushOpacity}
        onSizeChange={onBrushSizeChange}
        onOpacityChange={onOpacityChange}
      />

      <div className="fixed bottom-0 z-10 flex items-center p-2 justify-center w-full flex-wrap">
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            isSelected={selectedColor === color}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>

      <TrashButton onClick={onClear} />
      <MagicButton onClick={onMagicClick} isLoading={isLoading} />
    </>
  );
}; 
import { BrushControls } from './BrushControls';
import { TrashButton } from './TrashButton';
import { MagicButton } from './MagicButton';
import { ShareButton } from './ShareButton';
import { ColorBar } from './ColorBar';

interface CanvasControlsProps {
  selectedColor: string;
  selectedBrushSize: number;
  brushOpacity: number;
  isLoading: boolean;
  isDirty: boolean;
  hasMagicBeenUsed: boolean;
  isMagicAvailable: boolean;
  onBrushSizeChange: (size: number) => void;
  onOpacityChange: (opacity: number) => void;
  onColorChange: (color: string) => void;
  onClear: () => void;
  onMagicClick: () => void;
  onShare: () => Promise<string>;
}

export const CanvasControls = ({
  selectedBrushSize,
  brushOpacity,
  isLoading,
  isDirty,
  hasMagicBeenUsed,
  isMagicAvailable,
  onBrushSizeChange,
  onOpacityChange,
  onColorChange,
  onClear,
  onMagicClick,
  onShare,
}: CanvasControlsProps) => {

  return (
    <>
      <div className="fixed h-24 bottom-0 w-full px-4 p-4 flex justify-center bg-slate-900 border-t border-slate-600">
        <BrushControls 
          size={selectedBrushSize}
          opacity={brushOpacity}
          onSizeChange={onBrushSizeChange}
          onOpacityChange={onOpacityChange}
        />
        <ColorBar onColorChange={onColorChange} />
        <TrashButton onClick={onClear} />
        <ShareButton onShare={onShare} isDirty={isDirty} />
      </div>

      {isDirty && !hasMagicBeenUsed && isMagicAvailable && <MagicButton onClick={onMagicClick} isLoading={isLoading} />}
    </>
  );
}; 
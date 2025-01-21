import { SparklesIcon } from '@heroicons/react/24/outline';

interface MagicButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const MagicButton = ({ onClick, isLoading = false }: MagicButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="absolute left-1/2 transform -translate-x-1/2 top-5 z-10 rounded-full bg-purple-600 hover:bg-purple-700 p-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Transform drawing with magic"
    >
      <SparklesIcon className="w-8 h-8 text-white animate-pulse" />
      {isLoading && (
        <div className="absolute inset-0 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}
import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShareIcon, XMarkIcon, ClipboardDocumentIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  onShare: () => Promise<string>;
  isDirty: boolean;
}

export const ShareButton = ({ onShare, isDirty }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSharedUrl, setLastSharedUrl] = useState<string | null>(null);
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

  const handleClick = async () => {
    setIsOpen(true);
    
    if (lastSharedUrl && !isDirty) {
      setShareUrl(lastSharedUrl);
      return;
    }

    setIsLoading(true);
    setCopied(false);
    try {
      const url = await onShare();
      setShareUrl(url);
      setLastSharedUrl(url);
    } catch (error) {
      console.error('Error generating share URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShareUrl(null);
    setCopied(false);
  };

  const handleCopyUrl = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  const handleDownload = async () => {
    if (shareUrl) {
      try {
        const response = await fetch(shareUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'drawing.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        console.error('Failed to download image:', err);
      }
    }
  };

  return (
    <>
      <div
        ref={buttonRef}
        className="absolute right-16 bottom-3 z-20 rounded-full p-2 cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
        onClick={handleClick}
      >
        <ShareIcon className="w-6 h-6 text-white" />
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute bottom-16 right-16 mb-2 bg-white rounded-lg p-4 pt-9 shadow-lg"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          
          {isLoading ? (
            <div className="w-[128px] h-[128px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : shareUrl ? (
            <div className="flex flex-col items-center gap-2">
              <QRCodeSVG value={shareUrl} size={128} />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleCopyUrl}
                  className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                  title="Download Image"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-red-600">Failed to generate QR code</div>
          )}
        </div>
      )}
    </>
  );
}; 
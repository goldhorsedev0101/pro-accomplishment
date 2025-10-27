import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  selectedMedia: string;
  onOpenChange: () => void;
  isVideo: boolean;
}

export default function MediaViewer({ onOpenChange, selectedMedia, isVideo }: Props) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.25));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <Dialog open={!!selectedMedia} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-0 p-0 max-w-[95vw] max-h-[95vh] w-auto h-auto">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        {/* Header with controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Only show zoom/rotate controls for images */}
            {!isVideo && (
              <>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  disabled={zoom <= 0.25}
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  disabled={zoom >= 3}
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <RotateCw size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1 text-sm rounded bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  Reset
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange()}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Media container */}
        <div className="relative max-w-[90vw] h-[85vh] flex items-center justify-center overflow-hidden">
          {isVideo ? (
            // Video player
            <video
              src={selectedMedia}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: '80vw', maxHeight: '75vh' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            // Image viewer with zoom and rotation
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center',
              }}
            >
              {selectedMedia && (
                <Image
                  src={selectedMedia}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain"
                  style={{ maxWidth: '80vw', maxHeight: '75vh' }}
                  priority
                />
              )}
            </div>
          )}
        </div>

        {/* Click outside to close overlay */}
        <div className="absolute inset-0 -z-10" onClick={() => onOpenChange()} />
      </DialogContent>
    </Dialog>
  );
}

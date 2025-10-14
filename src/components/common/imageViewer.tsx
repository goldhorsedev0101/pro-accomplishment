import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  selectedImage: string;
  onOpenChange: () => void;
}

export default function ImageViewer({ onOpenChange, selectedImage }: Props) {
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
    <Dialog open={!!selectedImage} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-0 p-0 max-w-[95vw] max-h-[95vh] w-auto h-auto">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        {/* Header with controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange()}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image container */}
        <div className="relative max-w-[90vw] h-[85vh] flex items-center justify-center overflow-hidden">
          <div
            className="relative transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Preview"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
                style={{ maxWidth: '80vw', maxHeight: '75vh' }}
                priority
              />
            )}
          </div>
        </div>

        {/* Bottom info bar */}
        {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            Click and drag to pan • Scroll to zoom • ESC to close
          </div>
        </div> */}

        {/* Click outside to close overlay */}
        <div className="absolute inset-0 -z-10" onClick={() => onOpenChange()} />
      </DialogContent>
    </Dialog>
  );
}

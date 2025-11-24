import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DraggableMapModalProps {
  children: React.ReactNode;
  initialHeight?: 'min' | 'mid' | 'max';
  minHeight?: number;
  maxHeight?: number;
}

export const DraggableMapModal = ({
  children,
  initialHeight = 'mid',
  minHeight = 20,
  maxHeight = 85
}: DraggableMapModalProps) => {
  const [height, setHeight] = useState<'min' | 'mid' | 'max'>(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const heightClasses = {
    min: `h-[${minHeight}vh]`,
    mid: 'h-[50vh]',
    max: `h-[${maxHeight}vh]`
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    setCurrentY(clientY);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const deltaY = startY - currentY;
    const threshold = 50;

    if (deltaY > threshold) {
      // Dragged up
      if (height === 'min') setHeight('mid');
      else if (height === 'mid') setHeight('max');
    } else if (deltaY < -threshold) {
      // Dragged down
      if (height === 'max') setHeight('mid');
      else if (height === 'mid') setHeight('min');
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientY);
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchend', handleEnd);
      document.addEventListener('mouseup', handleEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('mouseup', handleEnd);
    };
  }, [isDragging, startY, currentY]);

  const toggleHeight = () => {
    if (height === 'min') setHeight('mid');
    else if (height === 'mid') setHeight('max');
    else setHeight('min');
  };

  return (
    <div
      ref={modalRef}
      className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl transition-all duration-300 ease-out z-50 ${heightClasses[height]}`}
      style={{
        transform: isDragging ? `translateY(${currentY - startY}px)` : 'translateY(0)'
      }}
    >
      {/* Drag Handle */}
      <div
        className="w-full py-4 flex flex-col items-center cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mb-2" />
        <button
          onClick={toggleHeight}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          {height === 'max' ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto px-4 pb-4" style={{ height: 'calc(100% - 60px)' }}>
        {children}
      </div>
    </div>
  );
};

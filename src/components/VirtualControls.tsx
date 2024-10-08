import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface VirtualControlsProps {
  onMove: (direction: string) => void;
}

const VirtualControls: React.FC<VirtualControlsProps> = ({ onMove }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 mt-4">
      <div></div>
      <button
        onClick={() => onMove('up')}
        className="bg-[#bbada0] text-white p-2 rounded-full flex items-center justify-center"
        aria-label="Move Up"
      >
        <ArrowUp size={24} />
      </button>
      <div></div>
      <button
        onClick={() => onMove('left')}
        className="bg-[#bbada0] text-white p-2 rounded-full flex items-center justify-center"
        aria-label="Move Left"
      >
        <ArrowLeft size={24} />
      </button>
      <div></div>
      <button
        onClick={() => onMove('right')}
        className="bg-[#bbada0] text-white p-2 rounded-full flex items-center justify-center"
        aria-label="Move Right"
      >
        <ArrowRight size={24} />
      </button>
      <div></div>
      <button
        onClick={() => onMove('down')}
        className="bg-[#bbada0] text-white p-2 rounded-full flex items-center justify-center"
        aria-label="Move Down"
      >
        <ArrowDown size={24} />
      </button>
      <div></div>
    </div>
  );
};

export default VirtualControls;
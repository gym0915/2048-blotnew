import React from 'react';

interface TileProps {
  value: number;
}

const Tile: React.FC<TileProps> = ({ value }) => {
  const getBgColor = () => {
    const colors: { [key: number]: string } = {
      2: 'bg-[#eee4da]',
      4: 'bg-[#ede0c8]',
      8: 'bg-[#f2b179]',
      16: 'bg-[#f59563]',
      32: 'bg-[#f67c5f]',
      64: 'bg-[#f65e3b]',
      128: 'bg-[#edcf72]',
      256: 'bg-[#edcc61]',
      512: 'bg-[#edc850]',
      1024: 'bg-[#edc53f]',
      2048: 'bg-[#edc22e]',
    };
    return colors[value] || 'bg-[#cdc1b4]';
  };

  const getTextColor = () => {
    return value <= 4 ? 'text-[#776e65]' : 'text-white';
  };

  const getTextSize = () => {
    if (value < 100) return 'text-3xl';
    if (value < 1000) return 'text-2xl';
    return 'text-xl';
  };

  return (
    <div
      className={`aspect-square flex items-center justify-center rounded-sm ${getBgColor()} ${getTextColor()} ${getTextSize()} font-bold transition-all duration-100 ease-in-out`}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
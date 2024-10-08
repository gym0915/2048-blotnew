import React from 'react';
import Tile from './Tile';

interface BoardProps {
  board: number[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="aspect-square w-full max-w-md bg-[#bbada0] p-2 rounded-lg">
      <div className="grid grid-cols-4 gap-2 h-full">
        {board.flat().map((value, index) => (
          <Tile key={index} value={value} />
        ))}
      </div>
    </div>
  );
};

export default Board;
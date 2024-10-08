import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import VirtualControls from './components/VirtualControls';
import { initializeBoard, moveBoard, addNewTile, checkGameOver } from './utils/gameLogic';

const App: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(initializeBoard());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(
    parseInt(localStorage.getItem('highScore') || '0')
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameOver) {
        const directions: { [key: string]: string } = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right',
        };
        const direction = directions[e.key];
        if (direction) {
          move(direction);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, gameOver]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  const move = (direction: string) => {
    const [newBoard, points] = moveBoard(board, direction);
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      const boardWithNewTile = addNewTile(newBoard);
      setBoard(boardWithNewTile);
      setScore((prevScore) => prevScore + points);
      if (checkGameOver(boardWithNewTile)) {
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-5xl font-bold text-[#776e65]">2048</h1>
          <div className="flex space-x-2">
            <div className="bg-[#bbada0] rounded p-2 text-white">
              <div className="text-xs font-bold">SCORE</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
            <div className="bg-[#bbada0] rounded p-2 text-white">
              <div className="text-xs font-bold">BEST</div>
              <div className="text-xl font-bold">{highScore}</div>
            </div>
          </div>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <p className="text-[#776e65] text-sm">Join the numbers and get to the <strong>2048 tile!</strong></p>
          <button
            onClick={resetGame}
            className="bg-[#8f7a66] text-white font-bold py-2 px-4 rounded hover:bg-[#9f8a76] transition-colors"
          >
            New Game
          </button>
        </div>
        <Board board={board} />
        <VirtualControls onMove={move} />
      </div>
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#776e65]">Game Over!</h2>
            <p className="mb-4 text-[#776e65]">Your score: {score}</p>
            <button
              onClick={resetGame}
              className="bg-[#8f7a66] text-white font-bold py-2 px-4 rounded hover:bg-[#9f8a76] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
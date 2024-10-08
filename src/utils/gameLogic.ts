export const initializeBoard = (): number[][] => {
  const board = Array(4).fill(null).map(() => Array(4).fill(0));
  return addNewTile(addNewTile(board));
};

export const addNewTile = (board: number[][]): number[][] => {
  const emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push({ i, j });
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
  return board;
};

export const moveBoard = (board: number[][], direction: string): [number[][], number] => {
  let points = 0;
  const newBoard = JSON.parse(JSON.stringify(board));

  const move = (row: number[]) => {
    const newRow = row.filter((tile) => tile !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        points += newRow[i];
        newRow.splice(i + 1, 1);
      }
    }
    while (newRow.length < 4) {
      newRow.push(0);
    }
    return newRow;
  };

  if (direction === 'left') {
    for (let i = 0; i < 4; i++) {
      newBoard[i] = move(newBoard[i]);
    }
  } else if (direction === 'right') {
    for (let i = 0; i < 4; i++) {
      newBoard[i] = move(newBoard[i].reverse()).reverse();
    }
  } else if (direction === 'up') {
    for (let j = 0; j < 4; j++) {
      const column = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
      const newColumn = move(column);
      for (let i = 0; i < 4; i++) {
        newBoard[i][j] = newColumn[i];
      }
    }
  } else if (direction === 'down') {
    for (let j = 0; j < 4; j++) {
      const column = [newBoard[3][j], newBoard[2][j], newBoard[1][j], newBoard[0][j]];
      const newColumn = move(column);
      for (let i = 0; i < 4; i++) {
        newBoard[3 - i][j] = newColumn[i];
      }
    }
  }

  return [newBoard, points];
};

export const checkGameOver = (board: number[][]): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false;
      if (i < 3 && board[i][j] === board[i + 1][j]) return false;
      if (j < 3 && board[i][j] === board[i][j + 1]) return false;
    }
  }
  return true;
};
const getBoard = () => {
  const board: boolean[][] = [];

  for (let i = 0; i < 20; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < 20; j++) {
      let random = Math.random();
      if (random < 0.5) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    board.push(row);
  }
  return board;
};

export default getBoard;

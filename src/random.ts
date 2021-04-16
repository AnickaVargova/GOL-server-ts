const getBoard = () => {
  const numberOfRows = Math.ceil(Math.random() * 20);
  const numberOfColumns = Math.ceil(Math.random() * 20);

  const board: boolean[][] = [];

  for (let i = 0; i < numberOfRows; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < numberOfColumns; j++) {
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

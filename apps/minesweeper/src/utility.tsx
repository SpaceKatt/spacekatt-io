export const NEIGHBORS_FILTER = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export const BOUNDS_GAURD = (x: number, y: number, len: number): boolean => {
  return !(x >= 0 && y >= 0 && x < len && y < len);
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const createBooleanMap = (
  squaresInRow: number,
  state?: boolean
): boolean[][] => {
  const boolMap: boolean[][] = [];
  for (let i = 0; i < squaresInRow; i++) {
    const boolRow: boolean[] = [];
    for (let j = 0; j < squaresInRow; j++) {
      const isMine = state ? true : false;
      boolRow.push(isMine);
    }
    boolMap.push(boolRow);
  }
  return boolMap;
};

export const createMineMap = (
  squaresInRow: number,
  numMines: number
): boolean[][] => {
  const mineMap: boolean[][] = createBooleanMap(squaresInRow);

  let mineCount = 0;
  while (mineCount < numMines) {
    let i = -1;
    let j = -1;

    do {
      i = getRandomInt(squaresInRow);
      j = getRandomInt(squaresInRow);
    } while (mineMap[i][j] === true);

    mineMap[i][j] = true;
    mineCount++;
  }

  return mineMap;
};

export const initializeField = (squaresInRow: number): number[][] => {
  const field: number[][] = [];

  for (let i = 0; i < squaresInRow; i++) {
    const row: number[] = [];
    for (let j = 0; j < squaresInRow; j++) {
      row.push(0);
    }
    field.push(row);
  }

  return field;
};

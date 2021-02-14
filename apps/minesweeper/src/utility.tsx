import { MineCoordinates } from "./field/Mine";

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

export const WIN_CONDITION = (
  flagged: boolean[][],
  mineMap: MineCoordinates[][],
  hidden: boolean[][],
  mineCount: number
): boolean => {
  const target = flagged.length * flagged[0].length;
  let flaggedCount = 0;
  let visibleCount = 0;
  for (let i = 0; i < flagged.length; i++) {
    for (let j = 0; j < flagged[i].length; j++) {
      if (flagged[i][j] && mineMap[i][j].isMine) flaggedCount++;
      if (!hidden[i][j]) visibleCount++;
    }
  }

  const mineCorrection = mineCount - flaggedCount;

  return visibleCount + flaggedCount + mineCorrection === target;
};

export const BOUNDS_GAURD = (x: number, y: number, len: number): boolean => {
  return !(x >= 0 && y >= 0 && x < len && y < len);
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const createBooleanMap = (
  squaresInRow: number,
  squaresInColumn?: number,
  state?: boolean
): boolean[][] => {
  if (!squaresInColumn) {
    squaresInColumn = squaresInRow;
  }
  const boolMap: boolean[][] = [];
  for (let i = 0; i < squaresInRow; i++) {
    const boolRow: boolean[] = [];
    for (let j = 0; j < squaresInColumn; j++) {
      const isMine = state ? true : false;
      boolRow.push(isMine);
    }
    boolMap.push(boolRow);
  }
  return boolMap;
};

export const createMineMap = (
  numMines: number,
  squaresInRow: number,
  squaresInColumn?: number
): boolean[][] => {
  const mineMap: boolean[][] = createBooleanMap(squaresInRow);
  if (!squaresInColumn) {
    squaresInColumn = squaresInRow;
  }

  let mineCount = 0;
  while (mineCount < numMines) {
    let i = -1;
    let j = -1;

    do {
      i = getRandomInt(squaresInRow);
      j = getRandomInt(squaresInColumn);
    } while (mineMap[i][j] === true);

    mineMap[i][j] = true;
    mineCount++;
  }

  return mineMap;
};

export const initializeField = (
  squaresInRow: number,
  colCount?: number
): number[][] => {
  if (!colCount) {
    colCount = squaresInRow;
  }
  const field: number[][] = [];

  for (let i = 0; i < squaresInRow; i++) {
    const row: number[] = [];
    for (let j = 0; j < colCount; j++) {
      row.push(0);
    }
    field.push(row);
  }

  return field;
};

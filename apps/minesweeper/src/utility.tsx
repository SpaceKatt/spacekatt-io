import { MineCoordinates } from "./field/Mine";

export class ConfigConstants {
  static readonly gameStateDisplayHeight = "80px";
  static readonly highscoreDisplayHeight = "72px";
}

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

export const BOUNDS_GAURD = (
  row: number,
  col: number,
  lenRow: number,
  lenCol: number
): boolean => {
  return !(row >= 0 && col >= 0 && row < lenRow && col < lenCol);
};

export const setHighScore = (
  numMines: number,
  numRow: number,
  numColumn: number,
  time: number
): void => {
  if (typeof window !== "undefined") {
    const highScoreKey = `HIGH_SCORE_${numRow}_${numColumn}_${numMines}`;

    const highScore = localStorage.getItem(highScoreKey) || "";
    if (!highScore || time < Number(highScore)) {
      localStorage.setItem(highScoreKey, String(Math.round(time * 10) / 10));
    }
  }
};

export const checkHighScore = (
  numMines: number,
  numRow: number,
  numColumn: number
): string => {
  let highScore = "";
  if (typeof window !== "undefined") {
    const highScoreKey = `HIGH_SCORE_${numRow}_${numColumn}_${numMines}`;
    highScore = localStorage.getItem(highScoreKey) || highScore;
  }
  return highScore;
};

export const createMineCoordinates = (
  mineMap: boolean[][],
  neighborMap: number[][]
): MineCoordinates[][] => {
  const mineCoords: MineCoordinates[][] = [];

  for (let i = 0; i < mineMap.length; i++) {
    const mineRow = [];
    for (let j = 0; j < mineMap[i].length; j++) {
      const mineOpts = {
        x: i,
        y: j,
        isMine: mineMap[i][j],
        neighbors: neighborMap[i][j],
      };
      mineRow.push(mineOpts);
    }
    mineCoords.push(mineRow);
  }
  return mineCoords;
};

export const createNeighborMap = (mineMap: boolean[][]): number[][] => {
  const neighborMap = initializeField(mineMap.length);

  for (let i = 0; i < mineMap.length; i++) {
    for (let j = 0; j < mineMap[i].length; j++) {
      let neighborCount = 0;

      for (const neighbor of NEIGHBORS_FILTER) {
        const row = i + neighbor[0];
        const col = j + neighbor[1];
        if (BOUNDS_GAURD(row, col, mineMap.length, mineMap[0].length)) {
          continue;
        }
        if (mineMap[row][col]) {
          neighborCount++;
        }
      }

      neighborMap[i][j] = neighborCount;
    }
  }

  return neighborMap;
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
  if (!squaresInColumn) {
    squaresInColumn = squaresInRow;
  }

  const mineMap: boolean[][] = createBooleanMap(squaresInRow, squaresInColumn);

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

export const getWidthCssProp = (): string => {
  return "max(min(100%, 55vh), 424px)";
};

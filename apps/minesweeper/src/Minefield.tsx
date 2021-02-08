import React, { FunctionComponent, useState } from "react";
import { v4 } from "uuid";
import { Mine, MineCoordinates, MineProps } from "./Mine";
import {
  initializeField,
  NEIGHBORS_FILTER,
  BOUNDS_GAURD,
  createMineMap,
  createBooleanMap,
} from "./utility";

const createNeighborMap = (mineMap: boolean[][]): number[][] => {
  const neighborMap = initializeField(mineMap.length);

  for (let i = 0; i < mineMap.length; i++) {
    for (let j = 0; j < mineMap[i].length; j++) {
      let neighborCount = 0;

      for (const neighbor of NEIGHBORS_FILTER) {
        const row = i + neighbor[0];
        const col = j + neighbor[1];
        if (BOUNDS_GAURD(row, col, mineMap.length)) {
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

export interface MinefieldProps {
  squaresInRow: number;
  numberOfMines: number;
  mineMap: boolean[][];
}
export interface MinefieldState {
  gameOver: boolean;
  field: MineCoordinates[][];
  visited: boolean[][];
  hidden: boolean[][];
}

export const Minefield: FunctionComponent<MinefieldProps> = (props) => {
  const mineMap = props.mineMap;
  const neighborMap = createNeighborMap(mineMap);
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

  const visitNeighbors = (
    row: number,
    col: number,
    nMap: boolean[][]
  ): void => {
    const visited: boolean[][] = createBooleanMap(nMap.length);
    const queue: number[][] = [[row, col]];
    do {
      const nextNeighbor = queue.pop();
      if (nextNeighbor) {
        const [x, y] = nextNeighbor;
        visited[x][y] = true;
        if (mineCoords[x][y].neighbors !== 0) {
          continue;
        }
        nMap[x][y] = false;
        for (const neighbor of NEIGHBORS_FILTER) {
          const [diff_x, diff_y] = neighbor;
          const i = x + diff_x;
          const j = y + diff_y;
          if (BOUNDS_GAURD(i, j, mineCoords.length)) {
            continue;
          }
          if (visited[i][j]) {
            continue;
          }
          if (mineCoords[i][j].neighbors !== 0) {
            continue;
          }
          queue.push([i, j]);
        }
      }
    } while (queue.length > 0);
  };

  const initialHiddenMap: boolean[][] = createBooleanMap(
    mineCoords.length,
    true
  );
  const initialFlaggedMap: boolean[][] = createBooleanMap(mineCoords.length);
  const [hiddenMap, setHiddenMap] = useState({ hidden: initialHiddenMap });
  const [flaggedMap, setFlaggedMap] = useState(initialFlaggedMap);
  const [gameOver, setGaveOver] = useState(false);

  const mineHandler = (row: number, col: number) => {
    const newField = hiddenMap.hidden;
    console.log(`Logging: ${row} :: ${col}`);

    if (mineCoords[row][col].isMine) {
      setHiddenMap({ hidden: newField });
      setGaveOver(true);
      return;
    }

    if (mineCoords[row][col].neighbors === 0) {
      visitNeighbors(row, col, newField);
    }
    console.log("setting new field");
    newField[row][col] = false;
    setHiddenMap({ hidden: newField });
  };
  const flagHandler = (row: number, col: number) => {};

  const mines = [];
  for (let i = 0; i < hiddenMap.hidden.length; i++) {
    for (let j = 0; j < hiddenMap.hidden.length; j++) {
      const mineOpts: MineProps = {
        coords: mineCoords[i][j],
        flagged: flaggedMap[i][j],
        hidden: hiddenMap.hidden[i][j],
        mineHandler,
        flagHandler,
      };
      mines.push(<Mine key={v4()} {...mineOpts} />);
    }
  }

  const onClick = (event: any) => {
    setHiddenMap({ hidden: initialHiddenMap });
    setGaveOver(false);
  };

  return gameOver ? (
    <div className="GameOver">
      <button className="GameOverButton" onClick={onClick}>
        Retry?
      </button>
    </div>
  ) : (
    <div className="Minefield">{mines}</div>
  );
};

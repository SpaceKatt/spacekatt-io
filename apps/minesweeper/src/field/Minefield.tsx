import React, { FunctionComponent, useState } from "react";
import "./Minefield.css";
import { Mine, MineCoordinates, MineProps } from "./Mine";
import {
  NEIGHBORS_FILTER,
  BOUNDS_GAURD,
  createBooleanMap,
  WIN_CONDITION,
  generateMinefieldCSS,
} from "../utility";
import { GameConfig } from "./MinefieldController";

export interface MinefieldProps extends GameConfig {
  setIsGameActive: (isGameActive: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
}
// import { v4 } from "uuid";
// import { GameOver } from "../displays";
// import { TimerDisplay, ScoreDisplay } from "../displays";
// export interface MinefieldState {
//   gameOver: boolean;
//   field: MineCoordinates[][];
//   visited: boolean[][];
//   hidden: boolean[][];
// }

export const Minefield: FunctionComponent<MinefieldProps> = (props) => {
  const visitNeighbors = (
    row: number,
    col: number,
    hiddenField: boolean[][],
    mineCoords: MineCoordinates[][]
  ): void => {
    const visited: boolean[][] = createBooleanMap(
      hiddenField.length,
      hiddenField[0].length
    );
    const queue: number[][] = [[row, col]];
    do {
      const nextNeighbor = queue.pop();
      if (nextNeighbor) {
        const [x, y] = nextNeighbor;
        visited[x][y] = true;
        hiddenField[x][y] = false;
        if (mineCoords[x][y].neighbors !== 0) {
          continue;
        }
        for (const neighbor of NEIGHBORS_FILTER) {
          const [diff_x, diff_y] = neighbor;
          const i = x + diff_x;
          const j = y + diff_y;
          if (BOUNDS_GAURD(i, j, mineCoords.length, mineCoords[0].length)) {
            continue;
          }
          if (visited[i][j]) {
            continue;
          }
          queue.push([i, j]);
        }
      }
    } while (queue.length > 0);
  };

  const initialHiddenMap: boolean[][] = createBooleanMap(
    props.mineCoords.length,
    props.mineCoords[0].length,
    true
  );
  const initialFlaggedMap: boolean[][] = createBooleanMap(
    props.mineCoords.length,
    props.mineCoords[0].length
  );
  const [hiddenMap, setHiddenMap] = useState({ hidden: initialHiddenMap });
  const [flaggedMap, setFlaggedMap] = useState({ flagged: initialFlaggedMap });
  const [gameOver, setGaveOver] = useState(false);

  // click handler for a normal mine click
  const mineHandler = (row: number, col: number) => {
    const newField = hiddenMap.hidden;
    if (flaggedMap.flagged[row][col]) {
      // TODO: animation to register click
      return;
    }

    newField[row][col] = false;
    setHiddenMap({ hidden: newField });

    if (props.mineCoords[row][col].isMine) {
      setHiddenMap({ hidden: newField });
      setGaveOver(true);
      return;
    }

    if (props.mineCoords[row][col].neighbors === 0) {
      visitNeighbors(row, col, newField, props.mineCoords);
    }
  };
  // click handler to toggle flag state
  const flagHandler = (row: number, col: number) => {
    const newField = flaggedMap.flagged;
    newField[row][col] = !newField[row][col];
    setFlaggedMap({ flagged: newField });
  };

  const gameWon = WIN_CONDITION(
    flaggedMap.flagged,
    props.mineCoords,
    hiddenMap.hidden,
    props.numberOfMines
  );

  if (gameOver || gameWon) {
    props.setIsVictory(gameWon);
    props.setIsGameActive(false);
  }

  const mines = [];
  for (let i = 0; i < hiddenMap.hidden.length; i++) {
    for (let j = 0; j < hiddenMap.hidden[i].length; j++) {
      const mineOpts: MineProps = {
        key: String(i) + String(j),
        coords: props.mineCoords[i][j],
        flagged: flaggedMap.flagged[i][j],
        hidden: hiddenMap.hidden[i][j],
        mineHandler,
        flagHandler,
      };
      mines.push(<Mine {...mineOpts} />);
    }
  }

  const style = generateMinefieldCSS(hiddenMap.hidden[0].length);
  return <div style={style}>{mines}</div>;
};

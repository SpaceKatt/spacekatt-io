import * as CSS from "csstype";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Mine, MineCoordinates, MineProps } from "./Mine";
import { GameConfig } from "./MinefieldController";
import {
  NEIGHBORS_FILTER,
  BOUNDS_GAURD,
  createBooleanMap,
  WIN_CONDITION,
} from "../utility";
import "./Minefield.css";

export interface MinefieldProps extends GameConfig {
  setIsGameActive: (isGameActive: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
  setMinesLeft: (minesLeft: number) => void;
}

export const Minefield: FunctionComponent<MinefieldProps> = (props) => {
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
  // const [gameOver, setGaveOver] = useState(false);

  // click handler for a normal mine click
  const mineHandler = (row: number, col: number) => {
    const newField = hiddenMap.hidden;
    if (flaggedMap.flagged[row][col]) {
      // TODO: animation to register click
      return;
    }

    newField[row][col] = false;

    if (props.mineCoords[row][col].isMine) {
      setHiddenMap({ hidden: newField });
      props.setIsVictory(false);
      props.setIsGameActive(false);
      return;
    }

    if (props.mineCoords[row][col].neighbors === 0) {
      visitNeighbors(row, col, newField, props.mineCoords);
    }
    setHiddenMap({ hidden: newField });
    const gameWon = WIN_CONDITION(
      flaggedMap.flagged,
      props.mineCoords,
      hiddenMap.hidden,
      props.numberOfMines
    );

    props.setMinesLeft(props.numberOfMines - flaggedCount);

    if (gameWon) {
      props.setIsVictory(gameWon);
      props.setIsGameActive(false);
    }
  };

  let flaggedCount = 0;
  for (let i = 0; i < flaggedMap.flagged.length; i++) {
    for (let j = 0; j < flaggedMap.flagged[i].length; j++) {
      if (flaggedMap.flagged[i][j]) flaggedCount++;
    }
  }

  // click handler to toggle flag state
  const flagHandler = (row: number, col: number) => {
    const newField = flaggedMap.flagged;
    newField[row][col] = !newField[row][col];
    setFlaggedMap({ flagged: newField });
  };

  const mines = [];
  for (let i = 0; i < hiddenMap.hidden.length; i++) {
    for (let j = 0; j < hiddenMap.hidden[i].length; j++) {
      const mineOpts: MineProps = {
        key: `${String(i)}-${String(j)}`,
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
  return (
    <div id="Minefield" className="Minefield" style={style}>
      {mines}
    </div>
  );
};

const gridTemplateColumnsTemplate = (numColumns: number): string => {
  let gridCols = "auto";
  let colLen = 1;
  while (colLen < numColumns) {
    gridCols = gridCols + " auto";
    colLen++;
  }
  return gridCols;
};

// TODO: accept MinefieldProps
export const generateMinefieldCSS = (numColumns: number): CSS.Properties => {
  const gridTemplateColumns = gridTemplateColumnsTemplate(numColumns);

  const style: CSS.Properties = {
    gridTemplateColumns,
  };

  return style;
};

export const visitNeighbors = (
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

      // set visit memo and set element to visible
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
        // visit all unvisited neighbors of a square is not adjacent
        // to a mine square
        visited[i][j] = true;
        queue.push([i, j]);
      }
    }
  } while (queue.length > 0);
};

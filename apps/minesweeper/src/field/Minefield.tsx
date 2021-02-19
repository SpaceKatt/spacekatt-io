import * as CSS from "csstype";
import React, { FunctionComponent, useState } from "react";

import { Mine, MineCoordinates, MineProps } from "./Mine";
import { GameConfig } from "./MinefieldController";
import {
  NEIGHBORS_FILTER,
  BOUNDS_GAURD,
  createBooleanMap,
  WIN_CONDITION,
} from "../utility";

export interface MinefieldProps extends GameConfig {
  setIsGameActive: (isGameActive: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
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
  return (
    <div id="Minefield" style={style}>
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
    display: "grid",
    border: "1px solid slateblue",
    backgroundColor: "slateblue",
    gap: "5px 5px",

    // alignItems: "center",
    // margin: "0 auto",
    margin: "auto",

    height: "100%",
    width: "100%",
    // paddingTop: "100%",
    // position: "absolute",
    // top: "0",
    // right: "0",
    // bottom: "0",
    // left: "0",
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

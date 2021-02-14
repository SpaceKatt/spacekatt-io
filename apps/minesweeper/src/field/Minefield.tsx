import React, { FunctionComponent, useState } from "react";
import * as CSS from "csstype";
import { v4 } from "uuid";
import "./Minefield.css";
import { GameOver } from "../displays";
import { Mine, MineCoordinates, MineProps } from "./Mine";
import {
  initializeField,
  NEIGHBORS_FILTER,
  BOUNDS_GAURD,
  createBooleanMap,
  WIN_CONDITION,
} from "../utility";
import { TimerDisplay } from "../displays/TimerDisplay";
import { ScoreDisplay } from "../displays/ScoreDisplay";

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
  timerId: string;
  numberOfMines: number;
  startTime: number;
  mineMap: boolean[][];
  onClick: (event: any) => void;
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
  // abstract this
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

  // abstract to utility function
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
        nMap[x][y] = false;
        if (mineCoords[x][y].neighbors !== 0) {
          continue;
        }
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

    if (mineCoords[row][col].isMine) {
      setHiddenMap({ hidden: newField });
      setGaveOver(true);
      return;
    }

    if (mineCoords[row][col].neighbors === 0) {
      visitNeighbors(row, col, newField);
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
    mineCoords,
    hiddenMap.hidden,
    props.numberOfMines
  );

  // TODO: move to UTILs
  const gridTemplateColumns = ((numMinesInRow: number): string => {
    let gridCols = "auto";
    let colLen = 1;
    while (colLen < numMinesInRow) {
      gridCols = gridCols + " auto";
      colLen++;
    }
    return gridCols;
  })(mineCoords.length);

  // TODO: move to UTILS
  const style: CSS.Properties = {
    gridTemplateColumns,
    display: "grid",
    border: "1px solid slateblue",
    backgroundColor: "slateblue",
    gap: "5px 5px",

    alignItems: "center",
    margin: "0 auto",

    height: "100%",
    width: "100%",
    // paddingTop: "100%",
    // position: "absolute",
    top: "0",
    left: "0",
  };

  const isGameActive = !(gameOver || gameWon);
  const gameOverProps = {
    hidden: hiddenMap.hidden,
    flagged: flaggedMap.flagged,
    gameWon,
    onClick: props.onClick,
  };

  const mines = [];
  for (let i = 0; i < hiddenMap.hidden.length; i++) {
    for (let j = 0; j < hiddenMap.hidden.length; j++) {
      const mineOpts: MineProps = {
        key: String(i) + String(j),
        coords: mineCoords[i][j],
        flagged: flaggedMap.flagged[i][j],
        hidden: hiddenMap.hidden[i][j],
        mineHandler,
        flagHandler,
      };
      mines.push(<Mine {...mineOpts} />);
    }
  }
  const currentTime = new Date().getTime();
  // TODO: handle isGameActive in comp
  const gameOverComp = isGameActive ? (
    <span />
  ) : (
    <GameOver key={v4()} {...gameOverProps}></GameOver>
  );
  const timeDisplay = isGameActive ? (
    <TimerDisplay key={props.timerId}></TimerDisplay>
  ) : (
    <ScoreDisplay
      key={v4()}
      time={currentTime - props.startTime}
      gameWon={gameWon}
    ></ScoreDisplay>
  );

  return (
    <div className="ExperienceContainer">
      {timeDisplay}
      <div className="MinefieldContainer">
        <div style={style}>{mines}</div>
        {gameOverComp}
      </div>
    </div>
  );
};

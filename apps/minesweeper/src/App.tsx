import * as CSS from "csstype";
import React, { useState } from "react";
import { v4 } from "uuid";
// import "./App.css";
import { MinefieldController } from "./field";
import {
  createMineCoordinates,
  createMineMap,
  createNeighborMap,
} from "./utility";

export interface MinefieldConfig {
  numberOfMines: number;
  rowCount: number;
  columnCount: number;
}

export type DifficultyKeys = "Beginner" | "Intermediate" | "Advanced";

export type MinefieldDifficultyManifest = {
  [K in DifficultyKeys]: MinefieldConfig;
};

const difficulties: MinefieldDifficultyManifest = {
  Beginner: {
    numberOfMines: 6,
    rowCount: 10,
    columnCount: 6,
  },
  Intermediate: {
    numberOfMines: 22,
    rowCount: 18,
    columnCount: 18,
  },
  Advanced: {
    numberOfMines: 22,
    rowCount: 18,
    columnCount: 18,
  },
};

export function App() {
  const [difficulty, setDifficulty] = useState<DifficultyKeys>("Beginner");
  const selectedDifficulty = difficulties[difficulty];
  const numberOfMines = selectedDifficulty.numberOfMines;
  const squaresInRow = selectedDifficulty.rowCount;
  const squaresInColumn = selectedDifficulty.columnCount;

  console.log("generating map");
  const mineMap = createMineMap(numberOfMines, squaresInRow, squaresInColumn);
  const neighborMap = createNeighborMap(mineMap);
  const mineCoords = createMineCoordinates(mineMap, neighborMap);
  console.log("map generated");

  const [mines, setMines] = useState({ mines: mineMap });

  const gameOverHandler = (event: any) => {
    const newMines = createMineMap(
      numberOfMines,
      squaresInRow,
      squaresInColumn
    );
    setMines({ mines: newMines });
  };
  const minefieldControllerOpts = {
    numberOfMines,
    sessionId: v4(),
    startTime: new Date().getTime(),
    mineMap: mines.mines,
    mineCoords,
    gameOverHandler,
  };

  const appContainerStyle = generateAppContainerCSS(selectedDifficulty);
  const dummyContainer = generateMinefieldContainerCSS(selectedDifficulty);

  return (
    <div style={appContainerStyle}>
      <div style={dummyContainer}></div>
      <MinefieldController
        key={v4()}
        {...minefieldControllerOpts}
      ></MinefieldController>
    </div>
  );
}

export const generateAppContainerCSS = (
  minefieldConfig: MinefieldConfig
): CSS.Properties => {
  const style: CSS.Properties = {
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "inline-block",
    margin: "0 auto",
  };
  return style;
};

export const generateMinefieldContainerCSS = (
  minefieldConfig: MinefieldConfig
): CSS.Properties => {
  const style: CSS.Properties = {
    // marginTop: "75%",
    width: "100vh",
    height: "100vh",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  return style;
};

export default App;

import React, { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { Minefield } from "./field";
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
    numberOfMines: 10,
    rowCount: 15,
    columnCount: 10,
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

function App() {
  const numberOfMines = 24;
  const squaresInRow = 14;
  const squaresInColumn = 20;
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
  const minefieldOpts = {
    numberOfMines,
    timerId: v4(),
    startTime: new Date().getTime(),
    mineMap: mines.mines,
    mineCoords,
    gameOverHandler,
  };

  return (
    <div className="AppContainer">
      <div className="MinefieldContainer">
        <Minefield key={v4()} {...minefieldOpts} />
      </div>
    </div>
  );
}

export default App;

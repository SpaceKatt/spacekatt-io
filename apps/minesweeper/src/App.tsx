import * as CSS from "csstype";
import React, { useState } from "react";
import { v4 } from "uuid";
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

export const difficultyKeyLiteral = ["Beginner", "Intermediate", "Advanced"];
export const difficultyKeys = ["Beginner", "Intermediate", "Advanced"] as const;
export type DifficultyKeys = typeof difficultyKeys[number];

export type MinefieldDifficultyManifest = {
  [K in DifficultyKeys]: MinefieldConfig;
};

export const difficulties: MinefieldDifficultyManifest = {
  Beginner: {
    numberOfMines: 6,
    rowCount: 6,
    columnCount: 8,
  },
  Intermediate: {
    numberOfMines: 22,
    rowCount: 14,
    columnCount: 10,
  },
  Advanced: {
    numberOfMines: 42,
    rowCount: 22,
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

  const aspectRatioMap: {
    [K in DifficultyKeys]: string;
  } = {
    Beginner: "45%",
    Intermediate: "130%",
    Advanced: "130%",
  };
  const dummyContainer = generateDummyDivCSS(aspectRatioMap[difficulty]);

  return (
    <div style={appContainerStyle} id="AppContainer">
      <div style={dummyContainer} id="Dummy">
        <MinefieldController
          key={v4()}
          {...minefieldControllerOpts}
        ></MinefieldController>
      </div>
    </div>
  );
}

export const generateAppContainerCSS = (
  minefieldConfig: MinefieldConfig
): CSS.Properties => {
  const style: CSS.Properties = {
    width: "max(min(100%, 55vh), 390px)",
    // height: "100vh",
    position: "relative",
    display: "inline-block",
    margin: "0 auto",
  };
  return style;
};

export const generateDummyDivCSS = (aspectRation: string): CSS.Properties => {
  const style: CSS.Properties = {
    marginTop: aspectRation,
    // width: "100vh",
    // height: "100vh",
    // position: "absolute",
    // left: "50%",
    // top: "50%",
    // transform: "translate(-50%, -50%)",
  };
  return style;
};

export default App;

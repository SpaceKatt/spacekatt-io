import * as CSS from "csstype";
import React, { useState } from "react";
import { v4 } from "uuid";
import { DifficultySelector, DifficultySelectorProps } from "./displays";
import { HighScoreSummary, getHighScoreSummary } from "./displays/HighScore";
import { MinefieldController } from "./field";
import {
  ConfigConstants,
  createMineCoordinates,
  createMineMap,
  createNeighborMap,
  getWidthCssProp,
} from "./utility";

import "./App.css";

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
    numberOfMines: 1,
    // numberOfMines: 5,
    rowCount: 7,
    columnCount: 7,
  },
  Intermediate: {
    numberOfMines: 1,
    // numberOfMines: 18,
    rowCount: 14,
    columnCount: 12,
  },
  Advanced: {
    numberOfMines: 1,
    // numberOfMines: 50,
    rowCount: 24,
    columnCount: 18,
  },
};

export const aspectRatioMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: "109%",
  Intermediate: "125%",
  Advanced: "130%",
};

export const colorMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: "#10D7AE",
  Intermediate: "#E68E36",
  Advanced: "#DD517F",
};

export const buttonMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: "button button--success",
  Intermediate: "button button--warning",
  Advanced: "button button--danger",
};

export function App() {
  const [difficulty, setDifficulty] = useState<DifficultyKeys>("Beginner");

  const selectedDifficulty = difficulties[difficulty];
  const numberOfMines = selectedDifficulty.numberOfMines;
  const squaresInRow = selectedDifficulty.rowCount;
  const squaresInColumn = selectedDifficulty.columnCount;

  const mineMap = createMineMap(numberOfMines, squaresInRow, squaresInColumn);
  const neighborMap = createNeighborMap(mineMap);
  const mineCoords = createMineCoordinates(mineMap, neighborMap);
  const difficultySelectorProps: DifficultySelectorProps = {
    difficulties: difficultyKeyLiteral as DifficultyKeys[],
    selectedDifficulty: difficulty,
    setDifficulty,
  };
  const diffSelector = (
    <DifficultySelector {...difficultySelectorProps}></DifficultySelector>
  );

  // TODO add <>
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
    mineMap: mines.mines,
    mineCoords,
    gameOverHandler,
  };

  const appContainerStyle = generateAppContainerCSS();
  const dummyContainer = generateDummyDivCSS(aspectRatioMap[difficulty]);

  return (
    <div
      className="MetaMinesweeperContainer"
      style={generateMetaContainerCSS()}
    >
      {diffSelector}
      <div style={appContainerStyle} id="AppContainer">
        <div style={dummyContainer} id="Dummy"></div>
        <MinefieldController
          key={v4()}
          {...minefieldControllerOpts}
        ></MinefieldController>
      </div>
      <HighScoreSummary {...{ config: getHighScoreSummary() }} />
    </div>
  );
}

export const generateMetaContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: getWidthCssProp(),
    height: `calc(800% + ${ConfigConstants.highscoreDisplayHeight}}`,
  };
  return style;
};
export const generateAppContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: getWidthCssProp(),
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };
  return style;
};

export const generateDummyDivCSS = (aspectRation: string): CSS.Properties => {
  const style: CSS.Properties = {
    marginTop: aspectRation,
  };
  return style;
};

export default App;

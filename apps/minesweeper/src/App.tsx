import * as CSS from "csstype";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { DifficultySelector, DifficultySelectorProps } from "./displays";
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
    numberOfMines: 1,
    rowCount: 6,
    columnCount: 8,
  },
  Intermediate: {
    numberOfMines: 1,
    rowCount: 14,
    columnCount: 10,
  },
  Advanced: {
    numberOfMines: 40,
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
    <div id="metaMinesweeperContainer" style={generateMetaContainerCSS()}>
      {diffSelector}
      <div style={appContainerStyle} id="AppContainer">
        <div style={dummyContainer} id="Dummy"></div>
        <MinefieldController
          key={v4()}
          {...minefieldControllerOpts}
        ></MinefieldController>
      </div>
    </div>
  );
}

export const generateMetaContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  return style;
};
export const generateAppContainerCSS = (
  minefieldConfig: MinefieldConfig
): CSS.Properties => {
  const style: CSS.Properties = {
    width: "max(min(100%, 55vh), 390px)",
    position: "relative",
    // margin: "0 auto",
    display: "flex",
    flexDirection: "column",

    // height: "100vh",
    // display: "inline-block",
  };
  return style;
};

export const generateDummyDivCSS = (aspectRation: string): CSS.Properties => {
  const style: CSS.Properties = {
    marginTop: aspectRation,
    // width: "100%",
    // height: "100%",
    // position: "absolute",
    // left: "50%",
    // top: "50%",
    // transform: "translate(-50%, -50%)",
  };
  return style;
};

export default App;

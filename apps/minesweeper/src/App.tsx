import * as CSS from 'csstype';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { DifficultySelector, DifficultySelectorProps } from './displays';
import { HighScoreSummary, getHighScoreSummary } from './displays/HighScore';
import { MinefieldController } from './field';
import {
  createMineCoordinates,
  createMineMap,
  createNeighborMap,
  getWidthCssProp,
} from './utility';

import './App.css';

export interface MinefieldConfig {
  numberOfMines: number;
  rowCount: number;
  columnCount: number;
}

export const difficultyKeyLiteral = ['Beginner', 'Intermediate', 'Advanced'];
export const difficultyKeys = ['Beginner', 'Intermediate', 'Advanced'] as const;
export type DifficultyKeys = typeof difficultyKeys[number];

export type MinefieldDifficultyManifest = {
  [K in DifficultyKeys]: MinefieldConfig;
};

export const difficulties: MinefieldDifficultyManifest = {
  Beginner: {
    numberOfMines: 10,
    rowCount: 8,
    columnCount: 10,
  },
  Intermediate: {
    numberOfMines: 40,
    rowCount: 18,
    columnCount: 14,
  },
  Advanced: {
    numberOfMines: 99,
    rowCount: 20,
    columnCount: 24,
  },
};

export const aspectRatioMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: 'var(--beginner-aspect-ratio)',
  Intermediate: 'var(--inter-aspect-ratio)',
  Advanced: 'var(--advanced-aspect-ratio)',
};

export const colorMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: 'var(--beginner-color)',
  Intermediate: 'var(--intermediate-color)',
  Advanced: 'var(--advanced-color)',
};

export const displayMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: 'Display Display-Beginner',
  Intermediate: 'Display Display-Intermediate',
  Advanced: 'Display Display-Advanced',
};

export function App() {
  const [difficulty, setDifficulty] = useState<DifficultyKeys>('Beginner');

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
      squaresInColumn,
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
      style={generateMetaContainerCSS(difficulty)}
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

export const generateMetaContainerCSS = (
  difficulty: string,
): CSS.Properties => {
  const ratioMap: { [key: string]: string } = {
    Beginner: '500px',
    Intermediate: '550px',
    Advanced: '700px',
  };
  const style: CSS.Properties = {
    width: getWidthCssProp(),
    maxWidth: ratioMap[difficulty],
    color: 'black',
    // height: `calc(${ConfigConstants.highscoreDisplayHeight}}`,
  };
  return style;
};
export const generateAppContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: getWidthCssProp(),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
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

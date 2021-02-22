import * as CSS from "csstype";
import React, { FunctionComponent, useEffect, useState } from "react";
import { v4 } from "uuid";
import { GameStateDisplay, GameOver } from "../displays";
import { getHighScoreSummary, HighScoreSummary } from "../displays/HighScore";
import {
  checkHighScore,
  ConfigConstants,
  getWidthCssProp,
  onContextDevNull,
  setHighScore,
} from "../utility";
import { MineCoordinates } from "./Mine";
import { Minefield } from "./Minefield";
import "./Minefield.css";

export interface GameConfig {
  sessionId: string;
  numberOfMines: number;
  mineMap: boolean[][];
  mineCoords: MineCoordinates[][];
}

export interface MinefieldControllerProps extends GameConfig {
  gameOverHandler: (event: any) => void;
}
export const MinefieldController: FunctionComponent<MinefieldControllerProps> = (
  props
) => {
  const [isGameActive, setIsGameActive] = useState(true);
  const [minesLeft, setMinesLeft] = useState(props.numberOfMines);
  const [isVictory, setIsVictory] = useState(false);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  const minefieldOpts = {
    ...props,
    setIsGameActive: (isGameActive: boolean) => {
      setIsGameActive(isGameActive);
    },
    setIsVictory: (isVictory: boolean) => {
      setIsVictory(isVictory);
    },
    setMinesLeft,
  };

  useEffect(() => {
    // console.log("enter useEffect");
    const previousHighScore = checkHighScore(
      props.numberOfMines,
      props.mineCoords.length,
      props.mineCoords[0].length
    );
    const currentTime = new Date().getTime();
    const newPlayTime = Math.round((currentTime - startTime) / 1000);
    let highScore = previousHighScore;
    if (
      !isGameActive &&
      isVictory &&
      (!highScore || newPlayTime < Number(previousHighScore))
    ) {
      setIsNewHighScore(true);
    }
    if (isNewHighScore) {
      setHighScore(
        props.numberOfMines,
        props.mineCoords.length,
        props.mineCoords[0].length,
        newPlayTime
      );
      highScore = String(newPlayTime);
    }
    setPlayTime(newPlayTime);
  });

  const highScore = checkHighScore(
    props.numberOfMines,
    props.mineCoords.length,
    props.mineCoords[0].length
  );

  const displayProps = {
    playTime,
    highScore,
    minesLeft,
    isVictory,
    isGameActive,
    isNewHighScore,
  };
  const gameOverProps = {
    gameWon: isVictory,
    isGameActive,
    gameOverHandler: props.gameOverHandler,
  };
  const expContainerStyle = generateExperienceContainerCSS();
  const minefieldContStle = generateMinefieldContainerCSS();
  return (
    <div
      className="ExperienceContainer"
      style={expContainerStyle}
      onContextMenu={onContextDevNull}
    >
      <div className="TimerAndMinesLeft">
        <GameStateDisplay {...displayProps}></GameStateDisplay>
      </div>
      <div style={minefieldContStle} id="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        <GameOver key="gameOver" {...gameOverProps}></GameOver>
      </div>
    </div>
  );
};

const generateMinefieldContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // width: getWidthCssProp(),
    height: `calc(100% - ${ConfigConstants.gameStateDisplayHeight})`,
    verticalAlign: "top",
    position: "relative",
    borderRadius: "10px",
  };
  return style;
};
const generateExperienceContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // border: "2px",
    // borderStyle: "solid",
  };
  return style;
};

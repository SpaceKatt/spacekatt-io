import * as CSS from "csstype";
import React, { FunctionComponent, useEffect, useState } from "react";
import { v4 } from "uuid";
import { GameStateDisplay, GameOver } from "../displays";
import { getHighScoreSummary, HighScoreSummary } from "../displays/HighScore";
import { checkHighScore, setHighScore } from "../utility";
import { MineCoordinates } from "./Mine";
import { Minefield } from "./Minefield";

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
  };

  const previousHighScore = checkHighScore(
    props.numberOfMines,
    props.mineCoords.length,
    props.mineCoords[0].length
  );
  const currentTime = new Date().getTime();
  const playTime = Math.round((currentTime - startTime) / 1000);
  let highScore = previousHighScore;
  if (
    !isGameActive &&
    isVictory &&
    (!highScore || playTime < Number(previousHighScore))
  ) {
    setHighScore(
      props.numberOfMines,
      props.mineCoords.length,
      props.mineCoords[0].length,
      playTime
    );
    highScore = String(playTime);
  }
  const isNewHighScore = highScore < previousHighScore;

  const displayProps = {
    playTime,
    highScore,
    isVictory,
    isGameActive,
  };
  const gameOverProps = {
    gameWon: isVictory,
    isGameActive,
    gameOverHandler: props.gameOverHandler,
  };
  const highScoreSummaryProps = {
    config: getHighScoreSummary(),
  };
  const expContainerStyle = generateExperienceContainerCSS();
  const minefieldContStle = generateMinefieldContainerCSS();
  return (
    <div id="expContainer" style={expContainerStyle}>
      <div id="TimerAndMinesLeft">
        <GameStateDisplay {...displayProps}></GameStateDisplay>
      </div>
      <div style={minefieldContStle} id="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        <GameOver key="gameOver" {...gameOverProps}></GameOver>
      </div>
      <HighScoreSummary {...highScoreSummaryProps}></HighScoreSummary>
    </div>
  );
};

const generateMinefieldContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: "100%",
    height: "100%",
    verticalAlign: "top",
    position: "relative",
  };
  return style;
};
const generateExperienceContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  };
  return style;
};

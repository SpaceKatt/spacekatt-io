import * as CSS from "csstype";
import React, { FunctionComponent, useState } from "react";
import { v4 } from "uuid";
import { GameStateDisplay, GameOver } from "../displays";
import { checkHighScore } from "../utility";
import { MineCoordinates } from "./Mine";
import { Minefield } from "./Minefield";

export interface GameConfig {
  sessionId: string;
  numberOfMines: number;
  mineMap: boolean[][];
  mineCoords: MineCoordinates[][];
}

export interface MinefieldControllerProps extends GameConfig {
  startTime: number;
  gameOverHandler: (event: any) => void;
}
export const MinefieldController: FunctionComponent<MinefieldControllerProps> = (
  props
) => {
  const [isGameActive, setIsGameActive] = useState(true);
  const [isVictory, setIsVictory] = useState(false);

  const minefieldOpts = {
    ...props,
    setIsGameActive: (isGameActive: boolean) => {
      setIsGameActive(isGameActive);
    },
    setIsVictory: (isVictory: boolean) => {
      setIsVictory(isVictory);
    },
  };
  const currentTime = new Date().getTime();
  const playTime = (currentTime - props.startTime) / 1000;
  const highScore = checkHighScore(
    props.numberOfMines,
    props.mineCoords.length,
    props.mineCoords[0].length,
    playTime,
    isVictory
  );

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
  const expContainerStyle = generateExperienceContainerCSS();
  const minefieldContStle = generateMinefieldContainerCSS();
  return (
    <div id="expContainer" style={expContainerStyle}>
      <GameStateDisplay {...displayProps}></GameStateDisplay>
      <div style={minefieldContStle} id="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        <GameOver key={v4()} {...gameOverProps}></GameOver>
      </div>
    </div>
  );
};

const generateMinefieldContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: "100%",
    height: "100%",
    verticalAlign: "top",
  };
  return style;
};
const generateExperienceContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // width: "75%",
    // height: "75%",
    // left: "50%",
    // top: "50%",
    // position: "relative",
    /* position: absolute; *',
    /* margin: 0 auto; */
    // transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
  };
  return style;
};

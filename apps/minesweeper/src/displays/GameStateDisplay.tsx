import * as CSS from "csstype";
import React, { FunctionComponent } from "react";
import { TimerDisplay, ScoreDisplay } from ".";
import { ConfigConstants } from "../utility";
import { MinesLeft } from "./MinesLeft";

export interface GameStateDisplayProps {
  playTime: number;
  isVictory: boolean;
  highScore: string;
  isNewHighScore: boolean;
  isGameActive: boolean;
  minesLeft: number;
}
export const GameStateDisplay: FunctionComponent<GameStateDisplayProps> = (
  props
) => {
  const timerMinesLeftCSS = generateTimeMinesLeftCSS();
  const gameStateDisplayCSS = generateGameStateDisplayCSS();
  const display = props.isGameActive ? (
    <div style={timerMinesLeftCSS}>
      <TimerDisplay {...{ playTime: props.playTime }}></TimerDisplay>
      <MinesLeft {...{ minesLeft: props.minesLeft }}></MinesLeft>
    </div>
  ) : (
    <ScoreDisplay
      time={props.playTime}
      isNewHighScore={props.isNewHighScore}
      gameWon={props.isVictory}
      highScore={props.highScore}
    ></ScoreDisplay>
  );
  return <div style={gameStateDisplayCSS}>{display}</div>;
};

const generateGameStateDisplayCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    height: ConfigConstants.gameStateDisplayHeight,
    borderBottom: "3px",
    borderBottomStyle: "solid",
  };
  return style;
};

const generateTimeMinesLeftCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    verticalAlign: "middle",
    height: "100%",
  };
  return style;
};

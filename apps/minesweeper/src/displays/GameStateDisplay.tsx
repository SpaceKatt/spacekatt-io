import * as CSS from "csstype";
import React, { FunctionComponent } from "react";
import { TimerDisplay, ScoreDisplay } from ".";
import { ConfigConstants } from "../utility";
import { MinesLeft } from "./MinesLeft";

import "./index.css";

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
    <div className="DisplayContainer DisplayContainer--block">
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
  };
  return style;
};

const generateTimeMinesLeftCSS = (): CSS.Properties => {
  const style: CSS.Properties = {};
  return style;
};

import React, { FunctionComponent } from "react";
import { v4 } from "uuid";
import { TimerDisplay, ScoreDisplay } from ".";

export interface GameStateDisplayProps {
  playTime: number;
  isVictory: boolean;
  highScore: string;
  isGameActive: boolean;
}
export const GameStateDisplay: FunctionComponent<GameStateDisplayProps> = (
  props
) => {
  const display = props.isGameActive ? (
    <TimerDisplay {...{ playTime: props.playTime }}></TimerDisplay>
  ) : (
    <ScoreDisplay
      time={props.playTime}
      gameWon={props.isVictory}
      highScore={props.highScore}
    ></ScoreDisplay>
  );
  return display;
};

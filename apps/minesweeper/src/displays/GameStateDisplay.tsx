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
    <TimerDisplay key={v4()}></TimerDisplay>
  ) : (
    <ScoreDisplay
      key={v4()}
      time={props.playTime}
      gameWon={props.isVictory}
      highScore={props.highScore}
    ></ScoreDisplay>
  );
  return display;
};

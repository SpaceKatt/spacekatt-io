import React from "react";
import { FunctionComponent } from "react";

export interface ScoreDisplayProps {
  gameWon: boolean;
  highScore: string;
  time: number;
}

export const ScoreDisplay: FunctionComponent<ScoreDisplayProps> = (props) => {
  return (
    <div>
      {props.gameWon ? <p>you won</p> : <p>you lost</p>} Time:{" "}
      {Number(props.time).toFixed(0)} seconds. High score:{" "}
      {Number(props.highScore).toFixed(0)}
    </div>
  );
};

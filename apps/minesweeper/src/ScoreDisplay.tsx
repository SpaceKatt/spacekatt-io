import { FunctionComponent } from "react";

export interface ScoreDisplayProps {
  gameWon: boolean;
  time: number;
}

export const ScoreDisplay: FunctionComponent<ScoreDisplayProps> = (props) => {
  const scoreSecs = props.time / 1000;

  const highScore = localStorage.getItem("HIGH_SCORE") || "";
  if (props.gameWon) {
    if (!highScore || scoreSecs < Number(highScore)) {
      localStorage.setItem("HIGH_SCORE", String(scoreSecs));
      console.log("new high score");
    }
  }

  return (
    <div>
      {props.gameWon ? <p>you woj</p> : <p>you lost</p>} Time: {scoreSecs}{" "}
      seconds. High score: {highScore}
    </div>
  );
};

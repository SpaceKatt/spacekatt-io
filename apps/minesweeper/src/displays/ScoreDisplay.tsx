import { FunctionComponent } from "react";

export interface ScoreDisplayProps {
  gameWon: boolean;
  squaresInRow: number;
  numMines: number;
  time: number;
}

export const ScoreDisplay: FunctionComponent<ScoreDisplayProps> = (props) => {
  const scoreSecs = props.time / 1000;
  const highScoreKey = `HIGH_SCORE_${props.squaresInRow}_${props.numMines}`;

  const highScore = localStorage.getItem(highScoreKey) || "";
  if (props.gameWon) {
    if (!highScore || scoreSecs < Number(highScore)) {
      localStorage.setItem(highScoreKey, String(scoreSecs));
      console.log("new high score");
    }
  }

  return (
    <div>
      {props.gameWon ? <p>you won</p> : <p>you lost</p>} Time: {scoreSecs}{" "}
      seconds. High score: {highScore}
    </div>
  );
};

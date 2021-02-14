import { FunctionComponent } from "react";

export interface ScoreDisplayProps {
  gameWon: boolean;
  highScore: string;
  time: number;
}

export const ScoreDisplay: FunctionComponent<ScoreDisplayProps> = (props) => {
  return (
    <div>
      {props.gameWon ? <p>you won</p> : <p>you lost</p>} Time: {props.time}{" "}
      seconds. High score: {props.highScore}
    </div>
  );
};

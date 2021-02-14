import { FunctionComponent } from "react";
import "./GameOver.css";

export interface GameOverProps {
  gameWon: boolean;
  onClick: (event: any) => void;
}
export const GameOver: FunctionComponent<GameOverProps> = (props) => {
  const retryButton = props.gameWon ? (
    <button className="GameWon" onClick={props.onClick}>
      Retry?
    </button>
  ) : (
    <button className="GameOverButton" onClick={props.onClick}>
      Retry?
    </button>
  );
  return <div className="GameOver">{retryButton}</div>;
};

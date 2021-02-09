import { FunctionComponent } from "react";

export interface GameOverProps {
  hidden: boolean[][];
  flagged: boolean[][];
  gameWon: boolean;
  onClick: (event: any) => void;
}
export const GameOver: FunctionComponent<GameOverProps> = (props) => {
  const retryButton = props.gameWon ? (
    <div className="GameWon" onClick={props.onClick}></div>
  ) : (
    <button className="GameOverButton" onClick={props.onClick}>
      Retry?
    </button>
  );
  return <div className="GameOver">{retryButton}</div>;
};

import { FunctionComponent } from "react";

export interface GameOverProps {
  hidden: boolean[][];
  flagged: boolean[][];
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

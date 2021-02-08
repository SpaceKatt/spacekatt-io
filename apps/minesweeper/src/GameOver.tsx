import { FunctionComponent } from "react";

export interface GameOverProps {
  hidden: boolean[][];
  flagged: boolean[][];
  onClick: (event: any) => void;
}
export const GameOver: FunctionComponent<GameOverProps> = (props) => {
  return (
    <div className="GameOver">
      <button className="GameOverButton" onClick={props.onClick}>
        Retry?
      </button>
    </div>
  );
};

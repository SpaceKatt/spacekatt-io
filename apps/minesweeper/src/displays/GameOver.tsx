import React from 'react';
import { FunctionComponent } from 'react';
import './GameOver.css';

export interface GameOverProps {
  gameWon: boolean;
  isGameActive: boolean;
  gameOverHandler: (event: any) => void;
}
export const GameOver: FunctionComponent<GameOverProps> = (props) => {
  const retryButton = props.gameWon ? (
    <button className="GameWon" onClick={props.gameOverHandler}>
      Retry?
      <br />
      <br />
      Click anywhere to beat your score!
    </button>
  ) : (
    <button className="GameOverButton" onClick={props.gameOverHandler}>
      Retry?
      <br />
      <br />
      Click anywhere on map
    </button>
  );
  return props.isGameActive ? (
    <span />
  ) : (
    <div className="GameOver">{retryButton}</div>
  );
};

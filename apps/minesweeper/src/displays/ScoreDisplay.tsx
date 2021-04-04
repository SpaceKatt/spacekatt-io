import * as CSS from 'csstype';
import React from 'react';
import { FunctionComponent } from 'react';
import { getWidthCssProp } from '../utility';
import './index.css';

export interface ScoreDisplayProps {
  gameWon: boolean;
  isNewHighScore: boolean;
  highScore: string;
  time: number;
}

export const ScoreDisplay: FunctionComponent<ScoreDisplayProps> = (props) => {
  const scoreStyle = generateScoreCSS();
  const gameWon = props.gameWon ? (
    <span className="Display Display-Win">
      You Won! <br /> Congrats!
    </span>
  ) : (
    <span className="Display Display-Lose">
      You Lost... <br /> Sucks to suck!
    </span>
  );
  const highScore = props.isNewHighScore ? (
    <span className="Display Display-NewHighScore">
      New High <br /> Score!!!!!
    </span>
  ) : (
    <span className="Display Display-Info">
      High score <br /> {props.highScore || 'N/A'}
    </span>
  );
  return (
    <div className="DisplayContainer DisplayContainer--block">
      {gameWon}
      <span className="Display Display-Timer">
        Time <br /> {Number(props.time)} seconds
      </span>
      {highScore}
    </div>
  );
};

export const generateScoreCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // width: getWidthCssProp(),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    // alignContent: "stretch",
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  };
  return style;
};

import React, { FunctionComponent, useState } from "react";
import { v4 } from "uuid";
import { TimerDisplay, ScoreDisplay, GameOver } from "../displays";
import { MineCoordinates } from "./Mine";
import { Minefield, MinefieldProps } from "./Minefield";

export interface GameConfig {
  sessionId: string;
  numberOfMines: number;
  mineMap: boolean[][];
  mineCoords: MineCoordinates[][];
}

export interface MinefieldControllerProps extends GameConfig {
  startTime: number;
  gameOverHandler: (event: any) => void;
}
export const MinefieldController: FunctionComponent<MinefieldControllerProps> = (
  props
) => {
  const [isGameActive, setIsGameActive] = useState(true);
  const [isVictory, setIsVictory] = useState(false);

  const minefieldOpts = {
    ...props,
    setIsGameActive: (isGameActive: boolean) => {
      setIsGameActive(isGameActive);
    },
    setIsVictory: (isVictory: boolean) => {
      setIsVictory(isVictory);
    },
  };

  const currentTime = new Date().getTime();
  const display = isGameActive ? (
    <TimerDisplay key={props.sessionId}></TimerDisplay>
  ) : (
    <ScoreDisplay
      key={v4()}
      time={currentTime - props.startTime}
      gameWon={isVictory}
      squaresInRow={props.mineCoords.length}
      numMines={props.numberOfMines}
    ></ScoreDisplay>
  );
  const gameOverProps = {
    gameWon: isVictory,
    gameOverHandler: props.gameOverHandler,
  };
  const gameOverComp = isGameActive ? (
    <span />
  ) : (
    <GameOver key={v4()} {...gameOverProps}></GameOver>
  );
  return (
    <div className="ExperienceContainer">
      {display}
      <div className="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        {gameOverComp}
      </div>
    </div>
  );
};

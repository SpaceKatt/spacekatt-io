import React, { FunctionComponent, useState } from "react";
import { v4 } from "uuid";
import { GameStateDisplay, GameOver } from "../displays";
import { checkHighScore } from "../utility";
import { MineCoordinates } from "./Mine";
import { Minefield } from "./Minefield";

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
  const playTime = (currentTime - props.startTime) / 1000;
  const highScore = checkHighScore(
    props.numberOfMines,
    props.mineCoords.length,
    props.mineCoords[0].length,
    playTime,
    isVictory
  );

  const displayProps = {
    playTime,
    highScore,
    isVictory,
    isGameActive,
  };
  const gameOverProps = {
    gameWon: isVictory,
    isGameActive,
    gameOverHandler: props.gameOverHandler,
  };
  return (
    <div className="ExperienceContainer">
      <GameStateDisplay {...displayProps}></GameStateDisplay>
      <div className="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        <GameOver key={v4()} {...gameOverProps}></GameOver>
      </div>
    </div>
  );
};

import React, { FunctionComponent, useState } from "react";
import { v4 } from "uuid";
import { TimerDisplay, ScoreDisplay, GameOver } from "../displays";
import { MineCoordinates } from "./Mine";
import { Minefield } from "./Minefield";

export interface GameConfig {
  sessionId: string;
  numberOfMines: number;
  mineMap: boolean[][];
  mineCoords: MineCoordinates[][];
}

export const checkHighScore = (
  numMines: number,
  numRow: number,
  numColumn: number,
  time: number,
  gameWon: boolean
): string => {
  const highScoreKey = `HIGH_SCORE_${numRow}_${numColumn}_${numMines}`;

  let highScore = localStorage.getItem(highScoreKey) || "";
  if (gameWon) {
    if (!highScore || time < Number(highScore)) {
      localStorage.setItem(highScoreKey, String(time));
      highScore = String(time);
      console.log("New high score");
    }
  }

  return highScore || "N/A";
};

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

  const display = isGameActive ? (
    <TimerDisplay key={props.sessionId}></TimerDisplay>
  ) : (
    <ScoreDisplay
      key={v4()}
      time={playTime}
      gameWon={isVictory}
      highScore={highScore}
    ></ScoreDisplay>
  );
  const gameOverProps = {
    gameWon: isVictory,
    isGameActive,
    gameOverHandler: props.gameOverHandler,
  };
  return (
    <div className="ExperienceContainer">
      {display}
      <div className="MinefieldContainer">
        <Minefield {...minefieldOpts} />
        <GameOver key={v4()} {...gameOverProps}></GameOver>
      </div>
    </div>
  );
};

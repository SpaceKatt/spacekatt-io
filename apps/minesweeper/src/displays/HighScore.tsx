import * as CSS from "csstype";
import React from "react";
import { FunctionComponent } from "react";
import { v4 } from "uuid";
import {
  difficulties,
  difficultyKeyLiteral,
  DifficultyKeys,
  difficultyKeys,
  MinefieldConfig,
} from "../App";
import { checkHighScore, setHighScore } from "../utility";

export type HighScoreSummaryConfig = {
  [K in DifficultyKeys]: string;
};

export interface HighScoreSummaryProps {
  config: HighScoreSummaryConfig;
}

export const getHighScoreSummary = (): HighScoreSummaryConfig => {
  const codex = {} as HighScoreSummaryConfig;

  for (const key of difficultyKeyLiteral) {
    const config = difficulties[key as DifficultyKeys];
    codex[key as DifficultyKeys] = checkHighScore(
      config.numberOfMines,
      config.rowCount,
      config.columnCount
    );
  }

  return codex;
};

export const HighScoreSummary: FunctionComponent<HighScoreSummaryProps> = (
  props
) => {
  console.log(props);
  const summaryCards = [];
  for (const key of Object.keys(props.config)) {
    const difficulty = key;
    const score = props.config[key as DifficultyKeys];
    const card = (
      <div
        id={`${difficulty}HighScore`}
        key={v4()}
      >{`${difficulty} High Score: ${score}`}</div>
    );
    summaryCards.push(card);
  }
  const highScoreStyle = generateHighScoreContainerCSS();
  return (
    <div id="HighScoreSummary" style={highScoreStyle} key={v4()}>
      {summaryCards}
    </div>
  );
};

const generateHighScoreContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
  };
  return style;
};

import * as CSS from "csstype";
import React from "react";
import { FunctionComponent } from "react";
import {
  displayMap,
  colorMap,
  difficulties,
  difficultyKeyLiteral,
  DifficultyKeys,
} from "../App";
import { checkHighScore, ConfigConstants } from "../utility";

import "./index.css";

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
    codex[key as DifficultyKeys] =
      checkHighScore(
        config.numberOfMines,
        config.rowCount,
        config.columnCount
      ) || "N/A";
  }

  return codex;
};

export const HighScoreSummary: FunctionComponent<HighScoreSummaryProps> = (
  props
) => {
  const summaryCards = [];
  for (const key of Object.keys(props.config)) {
    const difficulty = key as DifficultyKeys;
    const score = props.config[difficulty];
    const cardStyle = generateHighScoreCardSCC(difficulty);
    const card = (
      <div
        id={`${difficulty}HighScore`}
        key={difficulty}
        style={cardStyle}
        className={displayMap[difficulty]}
      >
        {difficulty} <br /> {score}
      </div>
    );
    summaryCards.push(card);
  }
  const highScoreStyle = generateHighScoreContainerCSS();
  return (
    <div
      id="HighScoreSummary"
      className="DisplayContainer DisplayContainer--block"
      style={highScoreStyle}
    >
      {summaryCards}
    </div>
  );
};

const generateHighScoreContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    height: ConfigConstants.highscoreDisplayHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "0px",
    // padding: "7px",
  };
  return style;
};

const generateHighScoreCardSCC = (
  difficulty: DifficultyKeys
): CSS.Properties => {
  const style: CSS.Properties = {
    backgroundColor: colorMap[difficulty],
  };
  return style;
};

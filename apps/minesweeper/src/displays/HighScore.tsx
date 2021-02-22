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
import { checkHighScore, ConfigConstants, onContextDevNull } from "../utility";

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
        className="Display"
      >
        {difficulty} <br /> {score}
      </div>
    );
    summaryCards.push(card);
  }
  const highScoreStyle = generateHighScoreContainerCSS();
  return (
    <div className="DisplayContainer" onContextMenu={onContextDevNull}>
      <div
        className="Display Display-Info"
        style={{ backgroundColor: "aliceblue" }}
      >
        <div
          className="DisplayContainer DisplayContainer--col"
          style={{ height: ConfigConstants.highscoreDisplayHeight }}
        >
          <div className="Display Display-Timer">Previous High Scores</div>
          <div
            id="HighScoreSummary"
            className="DisplayContainer DisplayContainer--block"
            style={highScoreStyle}
          >
            {summaryCards}
          </div>
        </div>
      </div>
    </div>
  );
};

const generateHighScoreContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // ,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: "0",
    // paddingTop: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
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

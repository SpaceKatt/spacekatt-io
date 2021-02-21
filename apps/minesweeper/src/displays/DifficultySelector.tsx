import * as CSS from "csstype";
import React, { MouseEvent } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { DifficultyKeys, MinefieldConfig } from "../App";
import "infima/dist/css/default/default.css";
import { v4 } from "uuid";
import { getWidthCssProp } from "../utility";

export interface DifficultySelectorProps {
  difficulties: DifficultyKeys[];
  selectedDifficulty: DifficultyKeys;
  setDifficulty: React.Dispatch<DifficultyKeys>;
}
export const DifficultySelector: FunctionComponent<DifficultySelectorProps> = (
  props
) => {
  const onRadioChangeCurry = (difficulty: DifficultyKeys) => {
    return (event: MouseEvent<HTMLDivElement>) => {
      props.setDifficulty(difficulty);
    };
  };

  const difficultyButtons = [];
  for (const difficulty of props.difficulties) {
    const classNom =
      props.selectedDifficulty === difficulty
        ? "pills__item pills__item--active"
        : "pills__item";
    const diffButton = (
      <div
        key={v4()}
        className={classNom}
        defaultValue={difficulty}
        onClick={onRadioChangeCurry(difficulty)}
        style={{ color: colorMap[difficulty] }}
      >
        {difficulty}
      </div>
    );
    difficultyButtons.push(diffButton);
  }

  // const onSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log(selected);
  // };
  const style = generateDifficultySelectorCSS(props);
  const formStyle = generateFormCSS();
  const difficultyCSS = generateDifficultyCSS(props.selectedDifficulty);
  return (
    <div id="DifficultySelector" key={v4()} style={style}>
      <div key={v4()} className="pills pills--block" style={formStyle}>
        {difficultyButtons}
      </div>

      <div style={difficultyCSS} key={v4()}>
        Playing =&gt; {props.selectedDifficulty}
      </div>
    </div>
  );
};
const colorMap: {
  [K in DifficultyKeys]: string;
} = {
  Beginner: "#10D7AE",
  Intermediate: "#E68E36",
  Advanced: "#DD517F",
};

const generateDifficultyCSS = (difficulty: DifficultyKeys): CSS.Properties => {
  const style: CSS.Properties = {
    display: "flex",

    // height: "100%",
    // color: "black",
    padding: "2px 20px",
    justifyContent: "center",
    backgroundColor: colorMap[difficulty],
    borderRadius: "16px",
  };
  return style;
};
const generateFormCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    // width: "max(min(100%, 55vh), 390px)",
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // verticalAlign: "middle",
    // padding: "10px 30px",
    paddingBottom: "8px",
    paddingTop: "0px",
    // alignItems: "baseline",
  };
  return style;
};

export const generateDifficultySelectorCSS = (
  difficultySelectorProps: DifficultySelectorProps
): CSS.Properties => {
  const style: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    verticalAlign: "bottom",
    padding: "10px 17px",

    width: getWidthCssProp(),
    border: "2px",
    borderStyle: "solid",
    height: "100px",
    // padding: "14px",
    // position: "relative",
    // display: "inline-block",
    // margin: "0 auto",
  };
  return style;
};

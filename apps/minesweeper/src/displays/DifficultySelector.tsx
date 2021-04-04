import * as CSS from 'csstype';
import React, { MouseEvent } from 'react';
import { FunctionComponent } from 'react';
import { v4 } from 'uuid';

import { colorMap, DifficultyKeys } from '../App';
import { getWidthCssProp, onContextDevNull } from '../utility';

import 'infima/dist/css/default/default.css';
import './DifficultySelector.css';

export interface DifficultySelectorProps {
  difficulties: DifficultyKeys[];
  selectedDifficulty: DifficultyKeys;
  setDifficulty: React.Dispatch<DifficultyKeys>;
}
export const DifficultySelector: FunctionComponent<DifficultySelectorProps> = (
  props,
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
        ? 'SelectedDifficulty SelectedDifficulty--active'
        : 'SelectedDifficulty';
    const diffButton = (
      <div
        key={v4()}
        className={classNom}
        defaultValue={difficulty}
        onClick={onRadioChangeCurry(difficulty)}
        style={{ backgroundColor: colorMap[difficulty] }}
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
  const style = generateDifficultySelectorContainerCSS();
  const formStyle = generateFormCSS();
  const difficultyCSS = generateDifficultyPlayingCSS(props.selectedDifficulty);
  return (
    <div
      className="DifficultySelectorContainer"
      style={style}
      onContextMenu={onContextDevNull}
    >
      <div
        className="DifficultyButtons DifficultyButtons--block"
        style={formStyle}
      >
        {difficultyButtons}
      </div>

      <div className="DifficultyPlaying" style={difficultyCSS}>
        Playing =&gt; {props.selectedDifficulty}
      </div>
    </div>
  );
};

const generateDifficultyPlayingCSS = (
  difficulty: DifficultyKeys,
): CSS.Properties => {
  const style: CSS.Properties = {
    backgroundColor: colorMap[difficulty],
  };
  return style;
};
const generateFormCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '8px',
    paddingTop: '0px',
  };
  return style;
};

export const generateDifficultySelectorContainerCSS = (): CSS.Properties => {
  const style: CSS.Properties = {
    width: `calc(${getWidthCssProp()} - 4px`,
    paddingRight: '11px',
  };
  return style;
};

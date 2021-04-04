import React from 'react';
import { FunctionComponent } from 'react';
import './Mine.css';

export interface MineCoordinates {
  x: number;
  y: number;
  isMine: boolean;
  neighbors: number;
}

export interface MineProps {
  key: string;
  coords: MineCoordinates;
  flagged: boolean;
  hidden: boolean;
  mineHandler?: (x: number, y: number) => void;
  flagHandler?: (x: number, y: number) => void;
}

export const Mine: FunctionComponent<MineProps> = (props) => {
  const handleClick = (event: any): void => {
    if (!props.hidden) {
      return;
    }

    if (props.flagHandler && (event.type === 'contextmenu' || event.altKey)) {
      if (event.preventDefault) {
        event.preventDefault();
      }

      props.flagHandler(props.coords.x, props.coords.y);
      return;
    }

    if (props.flagged) {
      return;
    }

    if (props.mineHandler) {
      props.mineHandler(props.coords.x, props.coords.y);
    }
  };

  const hiddenSquare = props.flagged ? (
    <div className="HiddenIcon">
      <div className="Invis">0</div>
    </div>
  ) : (
    <div className="Unexplored">
      <div className="Invis">0</div>
    </div>
  );
  const exposed = props.coords.isMine ? (
    <div className="ExplodedMine"></div>
  ) : (
    <div className="Counter">
      {props.coords.neighbors === 0 ? (
        <div className="Invis">0</div>
      ) : (
        <div className="NeighborCounter">{props.coords.neighbors}</div>
      )}
    </div>
  );
  const square = props.hidden ? hiddenSquare : exposed;
  return (
    <div
      className="Mine"
      id={`mine-${props.coords.x}-${props.coords.y}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {square}
    </div>
  );
};

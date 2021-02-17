import React from "react";
import { FunctionComponent } from "react";
import "./Mine.css";

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

    if (event.altKey && props.flagHandler) {
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
    <div className="Invis">0</div>
  );
  const exposed = props.coords.isMine ? (
    <div className="ExplodedMine"></div>
  ) : (
    <div className="Counter">
      {props.coords.neighbors === 0 ? (
        <span> </span>
      ) : (
        <div className="NeighborCounter">{props.coords.neighbors}</div>
      )}
    </div>
  );
  const square = props.hidden ? hiddenSquare : exposed;
  return (
    <div className="Mine" onClick={handleClick}>
      {square}
    </div>
  );
};

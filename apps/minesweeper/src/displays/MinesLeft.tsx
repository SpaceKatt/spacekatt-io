import React from "react";
import "infima/dist/css/default/default.css";
import { FunctionComponent } from "react";

export interface MinesLeftProps {
  minesLeft: number;
}
export const MinesLeft: FunctionComponent<MinesLeftProps> = (props) => {
  return (
    <div className="button button--danger">
      Mines left <br /> {props.minesLeft}
    </div>
  );
};

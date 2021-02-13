import { useState } from "react";
import { FunctionComponent } from "react";

export interface TimerDisplayProps {
  time: number;
}
export const TimerDisplay: FunctionComponent<TimerDisplayProps> = (props) => {
  return <p>{props.time}</p>;
};

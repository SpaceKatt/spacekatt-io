import { useEffect, useState } from "react";
import { FunctionComponent } from "react";

export interface TimerDisplayProps {}
export const TimerDisplay: FunctionComponent<TimerDisplayProps> = (props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return <p>{time}</p>;
};
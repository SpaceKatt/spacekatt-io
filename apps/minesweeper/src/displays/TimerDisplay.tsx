import React from 'react';
import { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';

export interface TimerDisplayProps {}
export const TimerDisplay: FunctionComponent<TimerDisplayProps> = (props) => {
  const [playTime, setPlayTime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPlayTime((t) => {
        return t + 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <div className="Display Display-Timer">
      {/* <div style={{ opacity: "0" }}>0</div> */}
      Time <br />
      {` ${playTime.toFixed(0)}`}
    </div>
  );
};

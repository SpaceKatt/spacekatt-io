import React, { FunctionComponent, useState } from "react";
import "./App.css";

export interface MinefieldProps {}
export interface MinefieldState {
  field: number[][];
}

const fieldSize = 16;
const numberOfMines = 8;

const initialField: number[][] = ((
  size: number,
  numMines: number
): number[][] => {
  const field: number[][] = [];

  for (let i = 0; i < size; i++) {
    field.push([]);
    for (let j = 0; j < size; j++) {
      field[i].push(0);
    }
  }

  return field;
})(fieldSize, numberOfMines);

export interface MineProps {
  x: number;
  y: number;
  isMine: boolean;
}
// export const Mines: FunctionComponent<MineProps>

export const Minefield: FunctionComponent<MinefieldProps> = ({}) => {
  const [state, setState] = useState({ field: initialField });
  const mines = [];
  //  for (const i = 0; i < state.field.length; i++) {

  // };
  return <div className="Minefield"> style="1 0 {100 / (fieldSize + 8)}%"</div>;
};

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;

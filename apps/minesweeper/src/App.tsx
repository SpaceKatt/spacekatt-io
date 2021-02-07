import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { v4 } from "uuid";

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
  neighbors: number;
  mineHandler: () => void;
}

export interface MineState {
  flagged: boolean;
  hidden: boolean;
}

export const Mine: FunctionComponent<MineProps> = (props) => {
  const [state, setState] = useState<MineState>({
    flagged: false,
    hidden: true,
  });
  const handleClick = (event: any): void => {
    if (!state.hidden) {
      return;
    }

    if (event.shiftKey) {
      setState({ flagged: true, hidden: true });
      return;
    }

    if (state.flagged) {
      return;
    }

    if (props.isMine) {
      props.mineHandler();
    }
  };
  return (
    <button className="Mine" onClick={handleClick}>
      {/* <p>{props.isMine ? "x" : "o"}</p> */}
    </button>
  );
};

export interface MinefieldProps {}
export interface MinefieldState {
  gameOver: boolean;
  field: number[][];
}

export const Minefield: FunctionComponent<MinefieldProps> = ({}) => {
  const [state, setState] = useState({ field: initialField, gameOver: false });
  const mines = [];
  for (let i = 0; i < state.field.length; i++) {
    for (let j = 0; j < state.field[i].length; j++) {
      const mineOpts = {
        x: i,
        y: j,
        isMine: true,
        neighbors: 0,
        mineHandler: () => {
          setState({ gameOver: true, field: state.field });
        },
      };
      mines.push(<Mine key={v4()} {...mineOpts} />);
    }
  }
  const onClick = (event: any) => {
    setState({ gameOver: false, field: initialField });
  };
  return state.gameOver ? (
    <div className="GameOver">
      <button className="GameOverButton" onClick={onClick}>
        Retry?
      </button>
    </div>
  ) : (
    <div className="Minefield">{mines}</div>
  );
};

function App() {
  return (
    <div className="AppContainer">
      <div className="App">
        <div className="MinefieldContainer">
          <header className="App-header"></header>
          <Minefield />
        </div>
      </div>
    </div>
  );
}

export default App;

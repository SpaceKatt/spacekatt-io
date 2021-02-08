import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { v4 } from "uuid";

const NEIGHBORS_FILTER = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const BOUNDS_GAURD = (x: number, y: number, len: number): boolean => {
  return !(x >= 0 && y >= 0 && x < len && y < len);
};

export interface MineProps {
  x: number;
  y: number;
  isMine: boolean;
  neighbors: number;
  flagged: boolean;
  hidden: boolean;
  mineHandler?: () => void;
  visitNeighbors?: (x: number, y: number) => void;
}

export interface MineState {
  flagged: boolean;
  hidden: boolean;
}

export const Mine: FunctionComponent<MineProps> = (props) => {
  const [state, setState] = useState<MineState>({
    flagged: props.flagged,
    hidden: props.hidden,
  });
  const handleClick = (event: any): void => {
    if (!state.hidden) {
      return;
    }

    if (event.ctrlKey) {
      setState({ flagged: true, hidden: true });
      return;
    }

    if (state.flagged) {
      return;
    }

    if (props.isMine && props.mineHandler) {
      props.mineHandler();
    }

    setState({ flagged: state.flagged, hidden: false });

    // Auto-expose other tiles
    if (props.neighbors === 0 && props.visitNeighbors) {
      props.visitNeighbors(props.x, props.y);
    }
  };

  const icon = state.flagged ? <div>🚩</div> : <span></span>;
  const hiddenSquare = <div className="HiddenIcon">{icon}</div>;
  const exposed = props.isMine ? (
    <div className="ExplodedMine"></div>
  ) : (
    <div className="NeighborCounter">{props.neighbors}</div>
  );
  const square = state.hidden ? hiddenSquare : exposed;
  return (
    <div className="Mine" onClick={handleClick}>
      {square}
    </div>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const initializeField = (squaresInRow: number): number[][] => {
  const field: number[][] = [];

  for (let i = 0; i < squaresInRow; i++) {
    const row: number[] = [];
    for (let j = 0; j < squaresInRow; j++) {
      row.push(0);
    }
    field.push(row);
  }

  return field;
};

const createMineMap = (squaresInRow: number, numMines: number): boolean[][] => {
  const mineMap: boolean[][] = [];

  for (let i = 0; i < squaresInRow; i++) {
    const mineRow: boolean[] = [];
    for (let j = 0; j < squaresInRow; j++) {
      const isMine = false;
      mineRow.push(isMine);
    }
    mineMap.push(mineRow);
  }

  let mineCount = 0;
  while (mineCount < numMines) {
    let i = -1;
    let j = -1;

    do {
      i = getRandomInt(squaresInRow);
      j = getRandomInt(squaresInRow);
    } while (mineMap[i][j] === true);

    mineMap[i][j] = true;
    mineCount++;
  }

  return mineMap;
};

const createNeighborMap = (mineMap: boolean[][]): number[][] => {
  const neighborMap = initializeField(mineMap.length);

  for (let i = 0; i < mineMap.length; i++) {
    for (let j = 0; j < mineMap[i].length; j++) {
      let neighborCount = 0;

      for (const neighbor of NEIGHBORS_FILTER) {
        const row = i + neighbor[0];
        const col = j + neighbor[1];
        if (BOUNDS_GAURD(row, col, mineMap.length)) {
          continue;
        }
        if (mineMap[row][col]) {
          neighborCount++;
        }
      }

      neighborMap[i][j] = neighborCount;
    }
  }

  return neighborMap;
};

export interface MinefieldProps {
  squaresInRow: number;
  numberOfMines: number;
}
export interface MinefieldState {
  gameOver: boolean;
  field: MineProps[][];
}

export const Minefield: FunctionComponent<MinefieldProps> = (props) => {
  const mineMap = createMineMap(props.squaresInRow, props.numberOfMines);
  const neighborMap = createNeighborMap(mineMap);
  const initMineState: MineProps[][] = [];
  for (let i = 0; i < mineMap.length; i++) {
    const mineRow = [];
    for (let j = 0; j < mineMap[i].length; j++) {
      const mineOpts = {
        x: i,
        y: j,
        isMine: mineMap[i][j],
        neighbors: neighborMap[i][j],
        hidden: true,
        flagged: false,
      };
      mineRow.push(mineOpts);
    }
    initMineState.push(mineRow);
  }

  const [state, setState] = useState({ field: initMineState, gameOver: false });
  const visitNeighbors = (row: number, col: number): void => {
    const visited: boolean[][] = createMineMap(state.field.length, 0);
    const newField = state.field;
    const visit = (x: number, y: number, visitMap: boolean[][]): void => {
      if (visitMap[x][y]) {
        return;
      }
      visitMap[x][y] = true;
      newField[x][y].hidden = false;

      for (const neighbor of NEIGHBORS_FILTER) {
        const [diff_x, diff_y] = neighbor;
        const i = x + diff_x;
        const j = y + diff_y;

        if (BOUNDS_GAURD(i, j, visitMap.length)) {
          continue;
        }
        if (visitMap[i][j]) {
          continue;
        }
        if (!newField[i][j].hidden) {
          continue;
        }
        if (newField[i][j].neighbors !== 0) {
          continue;
        }

        visit(i, j, visitMap);
      }
    };

    visit(row, col, visited);
    setState({ field: newField, gameOver: state.gameOver });
  };
  const mineHandler = () => {
    setState({ gameOver: true, field: state.field });
  };
  const mines = [];
  for (const row of state.field) {
    for (const mine of row) {
      const mineOpts: MineProps = {
        ...mine,
        mineHandler,
        visitNeighbors,
      };
      mines.push(<Mine key={v4()} {...mineOpts} />);
    }
  }

  const onClick = (event: any) => {
    setState({ gameOver: false, field: initMineState });
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
  const minefieldOpts = {
    numberOfMines: 30,
    squaresInRow: 16,
  };

  return (
    <div className="AppContainer">
      <div className="App">
        <div className="MinefieldContainer">
          <header className="App-header"></header>
          <Minefield {...minefieldOpts} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { Minefield } from "./Minefield";
import { TimerDisplay } from "./TimerDisplay";
import { createMineMap } from "./utility";

function App() {
  const numberOfMines = 1;
  const squaresInRow = 10;
  console.log("generating map");
  const mineMap = createMineMap(squaresInRow, numberOfMines);
  console.log("map generated");

  const [mines, setMines] = useState({ mines: mineMap });

  const onClick = (event: any) => {
    const newMines = createMineMap(squaresInRow, numberOfMines);
    setMines({ mines: newMines });
  };
  const minefieldOpts = {
    numberOfMines,
    squaresInRow,
    timerId: v4(),
    startTime: new Date().getTime(),
    mineMap: mines.mines,
    onClick,
  };

  return (
    <div className="AppContainer">
      <div className="App">
        <Minefield key={v4()} {...minefieldOpts} />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { Minefield } from "./Minefield";
import { createMineMap } from "./utility";

function App() {
  const numberOfMines = 3;
  const squaresInRow = 6;
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
    mineMap: mines.mines,
    onClick,
  };

  return (
    <div className="AppContainer">
      <div className="App">
        <div className="MinefieldContainer">
          <header className="App-header"></header>
          <Minefield key={v4()} {...minefieldOpts} />
        </div>
      </div>
    </div>
  );
}

export default App;

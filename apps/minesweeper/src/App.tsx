import React from "react";
import "./App.css";
import { Minefield } from "./Minefield";
import { createMineMap } from "./utility";

function App() {
  const numberOfMines = 30;
  const squaresInRow = 16;
  const mineMap = createMineMap(squaresInRow, numberOfMines);
  const minefieldOpts = {
    numberOfMines,
    squaresInRow,
    mineMap,
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

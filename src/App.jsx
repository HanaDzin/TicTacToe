import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  //to keep track of order of the turns made (for the log)
  const [gameTurns, setGameTurns] = useState([]);

  //function to be executed every time we switch turns
  function handleSelectSquare(rowIndex, colIndex) {
    //updating the state based on its previous value - need to pass a function
    setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    //to add a new entry to the turns array, make an updated const where we copy the existing turns
    //and insert the new information in front of that - the first element in the array = latest turn
    setGameTurns((prevTurns) => {
      let currentPlayer = "X"; //we can't depend on another state to determine which player's turn it is
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        //so we check the newest entry to toggle to other player
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

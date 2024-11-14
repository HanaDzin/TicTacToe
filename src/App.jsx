import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//determining the current player based on an array of taken turns (latest turn = first element)
//based on current state value & when updating state
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameboard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameboard(gameTurns) {
  //has to be a deep copy because arrays are reference values!
  let gameboard = [...INITIAL_BOARD.map((array) => [...array])];

  //overwrite the gameboard with the data incoming from turns array, if there is any
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  //to keep track of order of the turns made (for the log)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameboard, players);
  const drawOccured = gameTurns.length === 9 && !winner;

  //function to be executed every time we switch turns
  function handleSelectSquare(rowIndex, colIndex) {
    //to add a new entry to the turns array, make an updated const where we copy the existing turns
    //and insert the new information in front of that - the first element in the array = latest turn
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || drawOccured) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

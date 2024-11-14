import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, turns }) => {
  let gameboard = initialBoard;

  //overwrite the gameboard with the data incoming from turns array, if there is any
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  /* const [gameboard, setGameboard] = useState(initialBoard);

  function handleClickSquare(rowIndex, colIndex) {
    setGameboard((prevGameboard) => {
      //to make sure object state is updated immutably, a (deep) copy is made
      const updatedBoard = [
        ...prevGameboard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    //call from inside the function that gets called when the button is clicked
    //calling a function that is defined outside of this component - the handleSelectSquare - which updates the state
    onSelectSquare();
  }*/

  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;

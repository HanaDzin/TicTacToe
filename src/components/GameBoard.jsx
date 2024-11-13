import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, activePlayerSymbol }) => {
  const [gameboard, setGameboard] = useState(initialBoard);

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
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleClickSquare(rowIndex, colIndex)}>
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

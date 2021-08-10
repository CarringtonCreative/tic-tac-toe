import React, { useState } from 'react';
import './App.css';
import { Player, TicTacToe }  from "./utils/utils";

const ticTacToe = new TicTacToe();
ticTacToe.initialize();
const initialBoard = ticTacToe.getBoard();

function App() {
  const [playerTurn, setPlayerTurn] = useState(Player.X);
  const [gameBoard] = useState(initialBoard);

  const onSquareClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;   
    const value =  target.innerHTML;
    const { row, col } = target.dataset;
    if(value === Player.BLANK) {
      if(playerTurn === Player.X) {
        ticTacToe.fillSquare(Number(row), Number(col), Player.X);
        setPlayerTurn(Player.O);
      } else {
        ticTacToe.fillSquare(Number(row), Number(col), Player.O);
        setPlayerTurn(Player.X);
      }
      ticTacToe.printBoard();
    }
  }

  const renderBoard = () => {
    return (
      <div className="Board-Container">
        {gameBoard.map((row, rowIndex) => 
          <div key={`row-${rowIndex}`}  className="Board-Row">
            {row.map((col, colIndex) => {
              return <div key={`col-${colIndex}`} data-col={colIndex} data-row={rowIndex} className="Board-Square" onClick={(event) => { onSquareClick(event) }}>{col}</div>
            })}
          </div>        
        )}
      </div>
    );
  }

  return (
    <div className="App-Container">
      <h2>Tic Tac Toe</h2>
      {renderBoard()}
    </div>
  );
}

export default App;


/* 
(event) => {
         
    }

*/
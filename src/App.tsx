import React, { useState, useEffect } from 'react';
import './App.css';
import GameManager, { GAME_STATE } from './GameManager';

const gameManager = new GameManager();

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.START);
  const [gameBoard, setGameBoard] = useState(gameManager.getGame());

  useEffect(() => {
    gameManager.startGame();
    const board = gameManager.getGame();
    setGameBoard(board);
  }, [gameManager]);

  const onCheckForWinner = (hasWinner: boolean) => {
    alert(`Do we have a winner ${hasWinner}`);
  }

  const onSquareClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    const { row, col } = target.dataset;
    const updated = gameManager.updateSquare(Number(row), Number(col), onCheckForWinner);
    if (updated) {
      const board = gameManager.getGame();
      setGameBoard(board);
    }
  }

  const onUpdateGameState = (gameState: string): void => {
    let newState = (gameState === GAME_STATE.STOP) ? GAME_STATE.START : GAME_STATE.STOP;
    gameManager.updateGameState(newState);
    setGameState(newState);
  }

  const renderBoard = (gameBoard: [string[]]) => {
    return (
      <div className="Board-Container">
        {gameBoard.map((row, rowIndex) =>
          <div key={`row-${rowIndex}`} className="Board-Row">
            {row.map((col, colIndex) => {
              return (
                <div
                  key={`col-${colIndex}`}
                  className="Board-Square"
                  data-col={colIndex}
                  data-row={rowIndex}
                  onClick={(event) => { onSquareClick(event) }}>
                  {col}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const renderGameControls = () => {
    return (
      <>
        <h2>{gameManager.getTimer()}</h2>
        <button style={{ color: "#fff", borderRadius: "0.5em", fontSize: "1em", padding: "0.25em", height: "2em", width: "6em", border: "0.15em solid #fff", cursor: "pointer", backgroundColor: "transparent" }}
          onClick={() => { onUpdateGameState(gameState) }}>
          {gameState}
        </button>
      </>
    );
  }

  return (
    <div className="App-Container">
      <h2>Tic Tac Toe</h2>
      {renderBoard(gameBoard)}
    </div>
  );
}

export default App;
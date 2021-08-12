import React, { useState, useEffect } from 'react';
import './App.css';
import GameManager, { GAME_STATE } from './GameManager';

function App() {
  const [gameManager] = useState(new GameManager());
  const [gameState, setGameState] = useState(GAME_STATE.START);

  useEffect(() => {
    gameManager.startGame();
  })

  const onSquareClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    const { row, col } = target.dataset;
    gameManager.updateSquare(Number(row), Number(col));
  }

  const onUpdateGameState = (gameState: string): void => {
    let newState = (gameState === GAME_STATE.STOP) ? GAME_STATE.START : GAME_STATE.STOP;
    gameManager.updateGameState(newState);
    setGameState(newState);
  }

  const renderBoard = () => {
    const gameBoard = gameManager.game.getBoard();
    return (
      <div className="Board-Container">
        {gameBoard.map((row, rowIndex) =>
          <div key={`row-${rowIndex}`} className="Board-Row">
            {row.map((col, colIndex) => {
              return (
                <div
                  key={`col-${colIndex}`}
                  data-col={colIndex}
                  data-row={rowIndex}
                  className="Board-Square"
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
      {renderBoard()}
    </div>
  );
}

export default App;
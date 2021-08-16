import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import GameManager from "./GameManager";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "25%",
    maxWidth: "50%",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};

const gameManager = new GameManager();
const initialEditForm = { symbol: "" };

function App() {
  //const [gameState, setGameState] = useState(GAME_STATE.START);
  const [gameBoard, setGameBoard] = useState(gameManager.getGame());
  const [editPlayer, setEditPlayer] = useState(false);
  const [editPlayerIndex, setEditPlayerIndex] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [editModalForm, setEditModalForm] = React.useState(initialEditForm);
  const [gameTime, setGameTime] = useState("00:00:00");

  useEffect(() => {
    gameManager.startGame((data: { formatedTime: string }) => {
      const { formatedTime } = data;
      setGameTime(formatedTime);
    });
    const board = gameManager.getGame();
    setGameBoard(board);
  }, []);

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const onCheckForWinner = (hasWinner: boolean) => {
    alert(`Do we have a winner ${hasWinner}`);
  };

  const onEditPlayer = (index: number) => {
    if (!editPlayer) {
      openEditModal();
      setEditPlayerIndex(index);
    } else {
      closeEditModal();
    }
    setEditPlayer(!editPlayer);
  };

  const onSquareClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    const { row, col } = target.dataset;
    const updated = gameManager.updateSquare(
      Number(row),
      Number(col),
      onCheckForWinner
    );
    if (updated) {
      const board = gameManager.getGame();
      setGameBoard(board);
    }
  };

  const onUpdateGameState = (gameState: string): void => {
    //let newState =
    //gameState === GAME_STATE.STOP ? GAME_STATE.START : GAME_STATE.STOP;
    //gameManager.updateGameState(newState);
    //setGameState(newState);
  };

  const renderBoard = (gameBoard: [string[]]) => {
    return (
      <div className="Board-Container">
        {gameBoard.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="Board-Row">
            {row.map((col, colIndex) => {
              return (
                <div
                  key={`col-${colIndex}`}
                  className="Board-Square"
                  data-col={colIndex}
                  data-row={rowIndex}
                  onClick={(event) => {
                    onSquareClick(event);
                  }}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderGameHeader = () => {
    return (
      <>
        <h2 style={{ margin: "0.15em" }}>Tic Tac Toe</h2>
        <h6 style={{ margin: "0.15em" }}>{gameTime}</h6>
        {/* <button
          style={{
            color: "#fff",
            borderRadius: "0.5em",
            fontSize: "1em",
            padding: "0.25em",
            height: "2em",
            width: "6em",
            border: "0.15em solid #fff",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
          onClick={() => {
            onUpdateGameState(gameState);
          }}
        >
          {gameState}
        </button> */}
      </>
    );
  };

  const renderPlayers = () => {
    const players = gameManager.getPlayers();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1em auto",
        }}
      >
        {players.map((player, playerIndex) => {
          return (
            <div
              key={`player-${playerIndex}`}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: "0em 0.5em" }}>
                Player {player.getSymbol().toUpperCase()}
              </h6>
              <div
                style={{
                  margin: "0em 0.5em",
                  borderRadius: "0.25em",
                  backgroundColor: "transparent",
                  border: "0.1em solid #FFCD32",
                  padding: "0.15em 0.5em",
                  fontSize: "0.5em",
                  cursor: "pointer",
                }}
                onClick={() => onEditPlayer(playerIndex)}
              >
                edit
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const onEditModalChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    setEditModalForm({ symbol: value });
  };

  const onConfirmEditPlayer = (
    index: number,
    symbol: string,
    gameManager: GameManager
  ) => {
    if (symbol.length > 2) {
      alert("Your symbol must be 2 characters or less");
    } else {
      gameManager.updatePlayerSymbol(index, symbol);
    }
  };

  const renderEditPlayerModal = (gameManager: GameManager) => {
    const player = gameManager.getPlayer(editPlayerIndex);
    const playerSymbol = player.getSymbol();
    return (
      <Modal
        ariaHideApp={false}
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <h1>Edit Player</h1>
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: "1em 0em",
            }}
          >
            <label style={{ margin: "0.5em 0em" }}>Change Symbol</label>
            <input
              style={{
                margin: "0.5em 0em",
                padding: "1em",
                border: "0.1em solid #ccc",
                borderRadius: "0.5em",
                backgroundColor: "#fff",
                width: "90%",
              }}
              defaultValue={playerSymbol.toUpperCase()}
              onChange={onEditModalChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: "1em 0em",
            }}
          >
            <button
              style={{ margin: "0.5em" }}
              type={"button"}
              onClick={closeEditModal}
            >
              Cancel
            </button>
            <button
              style={{ margin: "0.5em" }}
              type={"button"}
              onClick={() => {
                const { symbol } = editModalForm;
                onConfirmEditPlayer(editPlayerIndex, symbol, gameManager);
                closeEditModal();
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <div className="App-Container">
      {renderGameHeader()}
      {renderBoard(gameBoard)}
      {renderEditPlayerModal(gameManager)}
      {renderPlayers()}
    </div>
  );
}

export default App;

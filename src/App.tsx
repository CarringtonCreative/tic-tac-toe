import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import GameManager from "./GameManager";
import GameSquare from "./GameSquare";
import { STATE } from "./GameState";
import { PlayIcon, PauseIcon, StopIcon, EditIcon } from "./icons";
import Player from "./Player";
import AppStyles from "./css/App.module.css";

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

function App(): JSX.Element {
  const [gameState, setGameState] = useState(STATE.STARTED.name);
  const [gameBoard, setGameBoard] = useState(gameManager.getGame());
  const [editPlayer, setEditPlayer] = useState(false);
  const [editPlayerIndex, setEditPlayerIndex] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [editModalForm, setEditModalForm] = React.useState(initialEditForm);
  const [gameTime, setGameTime] = useState("00:00:00");

  useEffect(() => {
    gameManager.startGame((data: { formattedTime: string }) => {
      const { formattedTime } = data;
      setGameTime(formattedTime);
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

  const onCheckForWinner = (result: { isWin: boolean; player: Player }) => {
    const { player } = result;
    const symbol = player.getSymbol();
    alert(`Player ${symbol} won`);
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

  const onUpdateGameState = (newState: string): void => {
    if (newState === gameState) return;
    gameManager.updateGameState(newState, (data: { formattedTime: string }) => {
      const { formattedTime } = data;
      setGameTime(formattedTime);
    });
    setGameState(newState);
  };

  const renderBoard = (gameBoard: [GameSquare[]]) => {
    return (
      <div className={AppStyles.BoardContainer}>
        {gameBoard.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={AppStyles.BoardRow}>
            {row.map((square, colIndex) => {
              const value = square.getValue();
              const hexColor = square.getHexColor();
              return (
                <div
                  style={{ backgroundColor: hexColor }}
                  key={`col-${colIndex}`}
                  className={AppStyles.BoardSquare}
                  data-col={colIndex}
                  data-row={rowIndex}
                  onClick={(event) => {
                    onSquareClick(event);
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderGameControls = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "0.25em",
            height: "1.5em",
            width: "1.5em",
            cursor: "pointer",
            backgroundColor: "transparent",
            margin: "0.15em",
          }}
          onClick={() => onUpdateGameState(STATE.STOPPED.name)}
        >
          <StopIcon
            height={"1em"}
            fill={gameState === STATE.STOPPED.name ? "#3fa8c0" : "#fff"}
          />
        </div>
        <div
          style={{
            padding: "0.25em",
            height: "1.5em",
            width: "1.5em",
            cursor: "pointer",
            backgroundColor: "transparent",
            margin: "0.15em",
          }}
          onClick={() => onUpdateGameState(STATE.PAUSED.name)}
        >
          <PauseIcon
            height={"1em"}
            fill={gameState === STATE.PAUSED.name ? "#3fa8c0" : "#fff"}
          />
        </div>
        <div
          style={{
            padding: "0.25em",
            height: "1.5em",
            width: "1.5em",
            cursor: "pointer",
            backgroundColor: "transparent",
            margin: "0.15em",
          }}
          onClick={() => onUpdateGameState(STATE.STARTED.name)}
        >
          <PlayIcon
            height={"1em"}
            fill={gameState === STATE.STARTED.name ? "#3fa8c0" : "#fff"}
          />
        </div>
      </div>
    );
  };

  const renderGameHeader = () => {
    return (
      <>
        <h2 style={{ margin: "0.15em" }}>Tic Tac Toe</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {renderScore()}
          <h6 style={{ margin: "0.15em" }}>{gameTime}</h6>
        </div>
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
          justifyContent: "center",
          alignItems: "center",
          margin: "0.25em auto",
        }}
      >
        {players.map((player, playerIndex) => {
          const symbol = player.getSymbol().toUpperCase();
          return (
            <div
              key={`player-${playerIndex}`}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: "0em 0.5em" }}>
                Player <span style={{ color: "#3fa8c0" }}>{symbol}</span>
              </h6>
              <div
                style={{
                  margin: "0.25em",
                  backgroundColor: "transparent",
                  padding: "0.15em",
                  cursor: "pointer",
                }}
                onClick={() => onEditPlayer(playerIndex)}
              >
                <EditIcon height={"0.75em"} width={"0.75em"} fill={"#FFCD32"} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderScore = () => {
    const score = gameManager.getScores();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "0.25em auto",
        }}
      >
        <h6 style={{ margin: "0em 0.5em" }}>Scores</h6>
        {score.map((score, index) => {
          return (
            <div
              key={`score-${index}`}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: "0em 0.5em", color: "#3fa8c0" }}>{score}</h6>
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
    <div className={AppStyles.AppContainer}>
      {renderEditPlayerModal(gameManager)}
      {renderGameHeader()}
      {renderPlayers()}
      {renderBoard(gameBoard)}
      {renderGameControls()}
    </div>
  );
}

export default App;

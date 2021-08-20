import Player from "./Player";
import TicTacToe from "./TicTacToe";
import GameTimer from "./GameTimer";
import GameState, { STATE } from "./GameState";
import GameSquare from "./GameSquare";

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  initializeCallback: (data: { time: number; formattedTime: string }) => void;
  stopCallback: (data: { time: number; formattedTime: string }) => void;
  startGameCallback: (data: { formattedTime: string }) => void;
  startCallback: () => void;
  updateSquareCallback: (data: { isWin: boolean; player: Player }) => void;
  updateGameStateCallback: (data: { formattedTime: string }) => void;
};

export default class GameManager {
  private game: TicTacToe;
  private players: [Player, Player];
  private gameState: GameState;
  private gameTimer: GameTimer;
  turn: number;

  constructor(turn?: number) {
    this.game = new TicTacToe();
    this.gameState = new GameState();
    this.gameTimer = new GameTimer(0, 1000);
    this.players = [new Player(), new Player()];
    this.turn = turn || 0;
  }

  checkRow = (
    row: number,
    playerSymbol: string,
    board: [GameSquare[]]
  ): { isRowWin: boolean; rowData: number[][] } => {
    let col = 0;
    let previous = board[row][col].getValue();
    let exploredRow = col === board[row].length;
    const rowData = [[row, col]];
    while (!exploredRow) {
      const current = board[row][col++].getValue();
      const symbolStreak = previous === current && current === playerSymbol;
      exploredRow = col === board[row].length;
      if (symbolStreak && exploredRow) {
        return { isRowWin: true, rowData };
      } else if (!symbolStreak || exploredRow) {
        return { isRowWin: false, rowData: [] };
      }
      rowData.push([row, col]);
      previous = current;
    }
    return { isRowWin: false, rowData: [] };
  };

  checkColumn = (
    col: number,
    playerSymbol: string,
    board: [GameSquare[]]
  ): { isColumnWin: boolean; columnData: number[][] } => {
    let row = 0;
    let previous = board[row][col].getValue();
    let exploredColumn = row === board.length;
    const columnData = [[row, col]];
    while (!exploredColumn) {
      const current = board[row++][col].getValue();
      const symbolStreak = previous === current && current === playerSymbol;
      exploredColumn = row === board.length;
      if (symbolStreak && exploredColumn) {
        return { isColumnWin: true, columnData };
      } else if (!symbolStreak || exploredColumn) {
        return { isColumnWin: false, columnData: [] };
      }
      columnData.push([row, col]);
      previous = current;
    }
    return { isColumnWin: false, columnData: [] };
  };

  checkLeftDiagonal = (
    board: [GameSquare[]],
    playerSymbol: string
  ): { isLeftDiagonalWin: boolean; leftDiagonalData: number[][] } => {
    let row = 0;
    let col = 0;
    let previous = board[row][col].getValue();
    let exploredDiagonal = row === board.length - 1;
    const leftDiagonalData = [[row, col]];
    while (!exploredDiagonal) {
      const current = board[++row][++col].getValue();
      const symbolStreak = previous === current && current === playerSymbol;
      exploredDiagonal = row === board.length - 1;
      leftDiagonalData.push([row, col]);
      if (symbolStreak && exploredDiagonal) {
        return { isLeftDiagonalWin: true, leftDiagonalData };
      } else if (!symbolStreak || exploredDiagonal) {
        return { isLeftDiagonalWin: false, leftDiagonalData: [] };
      }
      leftDiagonalData.push([row, col]);
      previous = current;
    }
    return { isLeftDiagonalWin: false, leftDiagonalData: [] };
  };

  checkRightDiagonal = (
    board: [GameSquare[]],
    playerSymbol: string
  ): { isRightDiagonalWin: boolean; rightDiagonalData: number[][] } => {
    let row = 0;
    let col = board.length - 1;
    let previous = board[row][col].getValue();
    let exploredDiagonal = col === 0;
    const rightDiagonalData = [[row, col]];
    while (!exploredDiagonal) {
      const current = board[++row][--col].getValue();
      const symbolStreak = previous === current && current === playerSymbol;
      exploredDiagonal = row === board.length - 1 && col === 0;
      if (symbolStreak && exploredDiagonal) {
        return { isRightDiagonalWin: true, rightDiagonalData };
      } else if (!symbolStreak || exploredDiagonal) {
        return { isRightDiagonalWin: false, rightDiagonalData: [] };
      }
      rightDiagonalData.push([row, col]);
      previous = current;
    }
    return { isRightDiagonalWin: false, rightDiagonalData: [] };
  };

  getGame = (): [GameSquare[]] => {
    return this.game.getBoard();
  };

  getPlayers = (): [Player, Player] => {
    return Object.assign([...this.players]);
  };

  getPlayer = (index: number): Player => {
    return Object.assign({ ...this.players[index] });
  };

  getPlayersBasedOnTurn = (turn: number): Player => {
    return turn === 0 ? this.players[0] : this.players[1];
  };

  initializePlayers = (): void => {
    if (this.players[0] && !this.players[0].getSymbol()) {
      this.players[0].setSymbol("x");
    }
    if (this.players[1] && !this.players[1].getSymbol()) {
      this.players[1].setSymbol("o");
    }
  };

  isAxialWin = (
    row: number,
    col: number,
    board: [GameSquare[]],
    symbol: string
  ): boolean => {
    const { isRowWin, rowData } = this.checkRow(row, symbol, board);
    const { isColumnWin, columnData } = this.checkColumn(col, symbol, board);
    if (isRowWin) this.gameState.updateWinCondition(rowData);
    if (isColumnWin) this.gameState.updateWinCondition(columnData);
    return isRowWin || isColumnWin;
  };

  isDiagonalWin = (board: [GameSquare[]], symbol: string): boolean => {
    const { isLeftDiagonalWin, leftDiagonalData } = this.checkLeftDiagonal(
      board,
      symbol
    );
    const { isRightDiagonalWin, rightDiagonalData } = this.checkRightDiagonal(
      board,
      symbol
    );
    if (isLeftDiagonalWin) this.gameState.updateWinCondition(leftDiagonalData);
    if (isRightDiagonalWin)
      this.gameState.updateWinCondition(rightDiagonalData);
    return isLeftDiagonalWin || isRightDiagonalWin;
  };

  isWin = (
    row: number,
    col: number,
    game: TicTacToe,
    player: Player
  ): boolean => {
    const board = game.getBoard();
    const symbol = player.getSymbol();
    const axialWin = this.isAxialWin(row, col, board, symbol);
    const diagonalWin = this.isDiagonalWin(board, symbol);
    if (axialWin || diagonalWin) {
      this.onHighlightWinCondition();
    }
    return axialWin || diagonalWin;
  };

  onHighlightWinCondition = (): void => {
    const condition = this.gameState.getWinCondition();
    for (let i = 0; i < condition.length; i++) {
      const square = condition[i];
      const row = Number(square[0]);
      const col = Number(square[1]);
      console.log(row, col);
      this.game.onChangeSquareColor(row, col, "#abc");
    }
  };

  getScores = (): number[] => {
    return this.gameState.getScores();
  };

  startGame = (callback: Props["startGameCallback"]): void => {
    this.gameTimer.initialize(callback);
    this.game.initialize();
    this.initializePlayers();
  };

  startTimer = (interval: number, callback: Props["startCallback"]): number => {
    return window.setInterval(callback, interval);
  };

  stopTimer = (timerId: number): void => {
    clearInterval(timerId);
  };

  updatePlayerSymbol = (playerIndex: number, newSymbol: string): void => {
    const player = this.players[playerIndex];
    if (player) {
      const board = this.game.getBoard();
      const oldSymbol = player.getSymbol();
      player.setSymbol(newSymbol);
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          const square = board[row][col];
          if (square.getValue() === oldSymbol) {
            this.game.onOverrideSquare(row, col, player);
          }
        }
      }
    }
  };

  updateSquare = (
    row: number,
    col: number,
    callback: Props["updateSquareCallback"]
  ): boolean => {
    const player = this.getPlayersBasedOnTurn(this.turn);
    const updated = this.game.onFillSquare(row, col, player);
    if (!updated) return false;
    this.turn = this.gameState.updateTurn();
    this.game.printBoard();
    const isWin = this.isWin(row, col, this.game, player);
    if (isWin) callback({ isWin, player });
    return true;
  };

  updateGameState = (
    newState: string,
    callback: Props["updateGameStateCallback"]
  ): void => {
    switch (newState) {
      case STATE.PAUSED.name:
        this.gameTimer.pause();
        break;
      case STATE.STARTED.name:
        this.gameTimer.initialize(callback);
        break;
      case STATE.STOPPED.name:
        this.gameTimer.stop(callback);
        break;
    }
    return;
  };
}

import Player from "./Player";
import TicTacToe from "./TicTacToe";

export const GAME_STATE = {
  PAUSE: "Pause",
  STOP: "Stop",
  START: "Start",
};

export default class GameManager {
  private game: TicTacToe;
  private players: [Player, Player];
  state: string;
  score: [number, number];
  timer: number;
  timerId: number;
  turn: number;

  constructor(
    score: [number, number] = [0, 0],
    timer: number = 0,
    turn: number = 0
  ) {
    this.state = GAME_STATE.STOP;
    this.score = score;
    this.timer = timer;
    this.turn = turn;
    this.timerId = 0;
    this.players = [new Player(), new Player()];
    this.game = new TicTacToe();
  }

  checkRow = (
    row: number,
    playerSymbol: string,
    board: [string[]]
  ): boolean => {
    let col = 0;
    let previous = board[row][col];
    let exploredRow = col === board[row].length;
    while (!exploredRow) {
      const current = board[row][col++];
      const symbolStreak = previous === current && current === playerSymbol;
      exploredRow = col === board[row].length;
      if (symbolStreak && exploredRow) {
        return true;
      } else if (!symbolStreak || exploredRow) {
        return false;
      }
    }
    return false;
  };

  checkColumn = (
    col: number,
    playerSymbol: string,
    board: [string[]]
  ): boolean => {
    let row = 0;
    let previous = board[row][col];
    let exploredColumn = row === board.length;
    while (!exploredColumn) {
      const current = board[row++][col];
      const symbolStreak = previous === current && current === playerSymbol;
      exploredColumn = row === board.length;
      if (symbolStreak && exploredColumn) {
        return true;
      } else if (!symbolStreak || exploredColumn) {
        return false;
      }
    }
    return false;
  };

  checkLeftDiagonal = (board: [string[]], playerSymbol: string): boolean => {
    let row = 0;
    let col = 0;
    let previous = board[row][col];
    let exploredDiagonal = row === board.length - 1;
    while (!exploredDiagonal) {
      let current = board[++row][++col];
      let symbolStreak = previous === current && current === playerSymbol;
      exploredDiagonal = row === board.length - 1;
      if (symbolStreak && exploredDiagonal) {
        return true;
      } else if (!symbolStreak || exploredDiagonal) {
        return false;
      }
      previous = current;
    }
    return false;
  };

  checkRightDiagonal = (board: [string[]], playerSymbol: string): boolean => {
    let row = 0;
    let col = board.length - 1;
    let previous = board[row][col];
    let exploredDiagonal = col === 0;
    while (!exploredDiagonal) {
      let current = board[++row][--col];
      let symbolStreak = previous === current && current === playerSymbol;
      exploredDiagonal = row === board.length - 1 && col === 0;
      if (symbolStreak && exploredDiagonal) {
        return true;
      } else if (!symbolStreak || exploredDiagonal) {
        return false;
      }
      previous = current;
    }
    return false;
  };

  getGame = (): [string[]] => {
    return this.game.getBoard();
  };

  getPlayers = (): [Player, Player] => {
    return Object.assign([...this.players]);
  };

  getPlayer = (index: number): Player => {
    return Object.assign({ ...this.players[index] });
  };

  getPlayersBasedOnTurn = (turn: number): Player => {
    return this.turn === 0 ? this.players[0] : this.players[1];
  };

  getTimer = (): number => {
    return this.timer;
  };

  initializePlayers = () => {
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
    board: [string[]],
    symbol: string
  ): boolean => {
    const isRowWin = this.checkRow(row, symbol, board);
    const isColumnWin = this.checkColumn(col, symbol, board);
    console.log("Is row win?", isRowWin, row);
    console.log("Is column win?", isColumnWin, col);
    return isRowWin || isColumnWin;
  };

  isDiagonalWin = (board: [string[]], symbol: string): boolean => {
    const isLeftDiagonalWin = this.checkLeftDiagonal(board, symbol);
    const isRightDiagonalWin = this.checkRightDiagonal(board, symbol);
    console.log("Is left diagonal win?", isLeftDiagonalWin);
    console.log("Is right diagonal win?", isRightDiagonalWin);
    return isLeftDiagonalWin || isRightDiagonalWin;
  };

  isWin = (row: number, col: number, game: TicTacToe, player: Player) => {
    const board = game.getBoard();
    const symbol = player.getSymbol();
    const axialWin = this.isAxialWin(row, col, board, symbol);
    const diagonalWin = this.isDiagonalWin(board, symbol);
    return axialWin || diagonalWin;
  };

  startGame = (): void => {
    const interval = 1000;
    this.startTimer(interval, () => {
      this.timer += interval;
    });
    this.game.initialize();
    this.initializePlayers();
  };

  startTimer = (interval: number, callback: Function): number => {
    return window.setInterval(callback, interval);
  };

  stopTimer = (timerId: number) => {
    clearInterval(timerId);
  };

  updatePlayerSymbol = (playerIndex: number, newSymbol: string) => {
    const player = this.players[playerIndex];
    if (player) {
      const board = this.game.getBoard();
      const oldSymbol = player.getSymbol();
      player.setSymbol(newSymbol);
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          const square = board[row][col];
          if (square === oldSymbol) {
            this.game.onOverrideSquare(row, col, player);
          }
        }
      }
    }
  };

  updateSquare = (row: number, col: number, callback: Function): boolean => {
    const player = this.getPlayersBasedOnTurn(this.turn);
    const updated = this.game.onFillSquare(row, col, player);
    if (!updated) return false;
    this.updateTurn(this.turn);
    this.game.printBoard();
    const hasWinner = this.isWin(row, col, this.game, player);
    if (hasWinner) {
      callback(hasWinner);
    }
    return true;
  };

  updateGameState = (state: string): void => {
    if (state === GAME_STATE.STOP) {
      this.stopTimer(this.timerId);
    } else {
      this.timerId = this.startTimer(1000, () => {
        this.timer += 1000;
      });
    }
    this.state = state;
  };

  updateScore(index: number, scores: [number, number]): [number, number] {
    if (!index) {
      return [scores[0]++, scores[1]];
    } else {
      return [scores[0], scores[1]++];
    }
  }

  updateTurn = (turn: number) => {
    this.turn = turn ? 0 : 1;
  };
}

import Player from "./Player";
import TicTacToe from "./TicTacToe";

export const GAME_STATE = {
  PAUSE: 'Pause',
  STOP: 'Stop',
  START: 'Start',
};

export default class GameManager {
  game: TicTacToe;
  players: [Player, Player];
  state: string;
  score: [number, number];
  timer: number;
  timerId: number;
  turn: number;

  constructor(score: [number, number] = [0, 0], timer: number = 0, turn: number = 0) {
    this.state = GAME_STATE.STOP;
    this.score = score;
    this.timer = timer;
    this.turn = turn;
    this.timerId = 0;
    this.players = [new Player(), new Player()];
    this.game = new TicTacToe();
  }

  getTimer = (): number => {
    return this.timer;
  }

  startGame = (): void => {
    const interval = 1000;
    this.startTimer(interval, () => {
      this.timer += interval;
    });
    this.game.initialize();
  }

  startTimer = (interval: number, callback: Function): number => {
    return window.setInterval(callback, interval);
  }

  stopTimer = (timerId: number) => {
    clearInterval(timerId);
  }

  getPlayersBasedOnTurn = (turn: number): Player => {
    return this.turn === 0 ? this.players[0] : this.players[1];
  }

  updateSquare = (row: number, col: number) => {
    const player = this.getPlayersBasedOnTurn(this.turn);
    this.game.onFillSquare(row, col, player);
    this.game.printBoard();
  }

  updateGameState = (state: string): void => {
    if (state === GAME_STATE.STOP) {
      this.stopTimer(this.timerId);
    } else {
      this.timerId = this.startTimer(1000, () => {
        this.timer += 1000;
      });
    }
    this.state = state;
  }

  updateScore(index: number, scores: [number, number]): [number, number] {
    if (!index) {
      return [scores[0]++, scores[1]];
    } else {
      return [scores[0], scores[1]++];
    }
  }

  isAxialWin = (board: [string[]]): boolean => {
    let row = 0;
    let col = 0;
    let isWin = false;
    let checkedRows = false;
    let previousValue = board[row][col];
    while (!checkedRows) {
      let currentValue = board[row][col++];
      if (previousValue !== currentValue) {
        if (row === board.length - 1) {
          break;
        } else {
          col = 0;
          row++;
          previousValue = board[row][col];
        }
      } else if (col === board[row].length - 1) {
        return true;
      }
    }

    let checkedCols = false;
    row = 0;
    col = 0;
    previousValue = board[row][col];
    while (!checkedCols) {
      let currentValue = board[row++][col];
      if (previousValue !== currentValue) {
        if (col === board.length - 1) {
          break;
        } else {
          col++;
          row = 0;
          previousValue = board[row][col];
        }
      } else if (row === board.length - 1) {
        return true;
      }
    }

    return isWin;
  };

  isDiagonalWin = (board: [string[]]): boolean => {
    let row = 0;
    let col = 0;
    let isWin = true;
    let previous = board[row][col];
    let checkedLeftDiagonal = false;
    while (!checkedLeftDiagonal) {
      let current = board[row++][col++];
      if (previous !== current) {
        isWin = false;
        break;
      }
      if (row === board.length - 1) {
        checkedLeftDiagonal = true;
      }
      previous = current;
    }

    if (isWin) {
      return true;
    }

    row = 0;
    col = board.length - 1;
    isWin = true;
    previous = board[row][col]
    let checkedRightDiagonal = false;
    while (!checkedRightDiagonal) {
      let current = board[row++][col--];
      if (previous !== current) {
        isWin = false;
        break;
      }
      if (col === 0) {
        checkedRightDiagonal = true;
      }
      previous = current;
    }
    return isWin;
  }

  isWin = (game: TicTacToe) => {
    const board = game.getBoard();
    const diagonalWin = this.isDiagonalWin(board);
    const axialWin = this.isAxialWin(board);
    return diagonalWin || axialWin;
  }

}

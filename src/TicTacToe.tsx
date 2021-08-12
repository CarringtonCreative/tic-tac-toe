import GameBoard from './GameBoard';
import Player from './Player';

export const GAME_SYMBOL = {
  BLANK: '•'
};

export default class TicTacToe implements GameBoard {
  rows: number;
  cols: number;
  board: [string[]];

  constructor(board: [string[]] = [[]], rows: number = 3, cols: number = 3) {
    this.board = board;
    this.rows = rows;
    this.cols = cols;
  }

  initialize(): void {
    for (let col = 0; col < this.cols; col++) {
      this.board[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.board[col][row] = GAME_SYMBOL.BLANK;
      }
    }
  }

  isValidSquare = (row: number, col: number) => {
    if (row < 0 || row >= this.rows) return false;
    if (col < 0 || col >= this.cols) return false;
    return true;
  }

  isEmptySquare(row: number, col: number): boolean {
    const isValid = this.isValidSquare(row, col);
    if (!isValid) return isValid;
    return this.board[row][col] === GAME_SYMBOL.BLANK;
  }

  onFillSquare = (row: number, col: number, player: Player): boolean => {
    const isEmpty = this.isEmptySquare(row, col);
    if (!isEmpty) return false;
    this.board[row][col] = player.getSymbol();
    return true;
  }

  getSquare(row: number, col: number): string {
    const isValid = this.isValidSquare(row, col);
    if (!isValid) return '';
    return this.board[row][col];
  }

  getBoard(): [string[]] {
    return Object.assign([...this.board]);
  }

  getEmptySquares(): number[][] {
    const squares = [];
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.board[col][row] === GAME_SYMBOL.BLANK) {
          squares.push([col, row]);
        }
      }
    }
    return squares;
  }

  printBoard(): void {
    let str = '- - - - -';
    for (let col = 0; col < this.cols; col++) {
      str += '\n| ';
      for (let row = 0; row < this.rows; row++) {
        str += this.board[col][row] + ' ';
      }
      str += '|';
    }
    str += '\n- - - - -';
    console.log(str);
  }

  resetBoard(): void {
    for (let col = 0; col < this.cols; col++) {
      this.board[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.board[col][row] = GAME_SYMBOL.BLANK;
      }
    }
  }
}
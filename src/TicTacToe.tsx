import GameBoard from "./GameBoard";
import GameSquare from "./GameSquare";
import Player from "./Player";

export const GAME_SYMBOL = {
  BLANK: "•",
};

export default class TicTacToe implements GameBoard {
  rows: number;
  cols: number;
  board: [GameSquare[]];

  constructor(board?: [GameSquare[]], rows?: number, cols?: number) {
    this.board = board || [[]];
    this.rows = rows || 3;
    this.cols = cols || 3;
  }

  initialize(): void {
    for (let col = 0; col < this.cols; col++) {
      this.board[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.board[col][row] = new GameSquare(row, col, GAME_SYMBOL.BLANK);
      }
    }
  }

  isValidSquare = (row: number, col: number): boolean => {
    if (row < 0 || row >= this.rows) return false;
    if (col < 0 || col >= this.cols) return false;
    return true;
  };

  isEmptySquare(row: number, col: number): boolean {
    const isValid = this.isValidSquare(row, col);
    if (!isValid) return isValid;
    return this.board[row][col].getValue() === GAME_SYMBOL.BLANK;
  }

  onFillSquare = (row: number, col: number, player: Player): boolean => {
    const isEmpty = this.isEmptySquare(row, col);
    if (!isEmpty) return false;
    this.board[row][col].setValue(player.getSymbol());
    return true;
  };

  onChangeSquareColor = (row: number, col: number, color: string): void => {
    this.board[row][col].setHexColor(color);
  };

  onOverrideSquare = (row: number, col: number, player: Player): boolean => {
    this.board[row][col].setValue(player.getSymbol());
    return true;
  };

  getSquareColor = (row: number, col: number): string => {
    return this.board[row][col].getHexColor();
  };

  getSquare(row: number, col: number): string {
    const isValid = this.isValidSquare(row, col);
    if (!isValid) return "";
    return this.board[row][col].getValue();
  }

  getBoard(): [GameSquare[]] {
    return Object.assign([...this.board]);
  }

  getNumberOfColumns = (): number => this.cols;

  getNumberOfRows = (): number => this.rows;

  getEmptySquares(): number[][] {
    const squares = [];
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.board[col][row].getValue() === GAME_SYMBOL.BLANK) {
          squares.push([col, row]);
        }
      }
    }
    return squares;
  }

  printBoard(): void {
    let str = "- - - - -";
    for (let col = 0; col < this.cols; col++) {
      str += "\n| ";
      for (let row = 0; row < this.rows; row++) {
        str += this.board[col][row].getValue() + " ";
      }
      str += "|";
    }
    str += "\n- - - - -";
    console.log(str);
  }

  resetBoard(): void {
    for (let col = 0; col < this.cols; col++) {
      this.board[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.board[col][row] = new GameSquare(row, col, GAME_SYMBOL.BLANK);
      }
    }
  }
}

interface GameBoard {
  rows: number,
  cols: number,
  board: [string[]],
}

export enum Player {
  X = 'x',
  O = 'o',
  BLANK = '•'
}

export class TicTacToe implements GameBoard {
  rows: number;
  cols: number;
  board: [string[]];
  score: [number, number] = [0, 0];

  constructor(board: [string[]] = [[]], rows: number = 3, cols: number = 3) {
    this.board = board;
    this.rows = rows;
    this.cols = cols;
  }

  initialize(): void {
    for (let i = 0; i < this.cols; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = Player.BLANK;
      }
    }
  }

  isSquareEmpty(row: number, col: number): boolean {
    if (row < 0 || row >= this.rows) return false;
    if (col < 0 || col >= this.cols) return false;
    return this.board[row][col] === Player.BLANK;
  }

  incrementPlayerScore(player: Player): void {
    if (player === Player.O) {
      this.score = [this.score[0], this.score[1]++];
    } else if (player === Player.X) {
      this.score = [this.score[0]++, this.score[1]];
    }
  }

  fillSquare = (row: number, col: number, player: Player) => {
    const isEmpty = this.isSquareEmpty(row, col);
    if (isEmpty) {
      this.board[row][col] = player;
    }
  }

  isAxialWin = (): boolean => {
    let row = 0;
    let col = 0;
    let isWin = false;
    let checkedRows = false;
    let previousValue = this.board[row][col];
    while (!checkedRows) {
      let currentValue = this.board[row][col++];
      if (previousValue !== currentValue) {
        if (row === this.board.length - 1) {
          break;
        } else {
          col = 0;
          row++;
          previousValue = this.board[row][col];
        }
      } else if (col === this.board[row].length - 1) {
        return true;
      }
    }

    let checkedCols = false;
    row = 0;
    col = 0;
    previousValue = this.board[row][col];
    while (!checkedCols) {
      let currentValue = this.board[row++][col];
      if (previousValue !== currentValue) {
        if (col === this.board.length - 1) {
          break;
        } else {
          col++;
          row = 0;
          previousValue = this.board[row][col];
        }
      } else if (row === this.board.length - 1) {
        return true;
      }
    }

    return isWin;
  };

  isDiagonalWin = (): boolean => {
    let row = 0;
    let col = 0;
    let isWin = true;
    let previous = this.board[row][col];
    let checkedLeftDiagonal = false;
    while (!checkedLeftDiagonal) {
      let current = this.board[row++][col++];
      if (previous !== current) {
        isWin = false;
        break;
      }
      if (row === this.board.length - 1) {
        checkedLeftDiagonal = true;
      }
      previous = current;
    }

    if (isWin) {
      return true;
    }

    row = 0;
    col = this.board.length - 1;
    isWin = true;
    previous = this.board[row][col]
    let checkedRightDiagonal = false;
    while (!checkedRightDiagonal) {
      let current = this.board[row++][col--];
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

  isWin = () => {
    const diagonalWin = this.isDiagonalWin();
    const axialWin = this.isAxialWin();
    return diagonalWin || axialWin;
  }

  getBoardPosition(row: number, col: number): string {
    return this.board[row][col];
  }

  getBoard(): [string[]] {
    return Object.assign([...this.board]);
  }

  getScore(): [number, number] {
    return Object.assign([...this.score])
  }

  getAvailablePositions(): number[][] {
    const positions = [];
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.board[i][j] === Player.BLANK) {
          positions.push([i, j]);
        }
      }
    }
    return positions;
  }

  printScore(): void {
    console.log(`${Player.X}: ${this.score[0]} ${Player.O}: ${this.score[1]}`);
  }

  printBoard(): void {
    let str = "- - - - -";
    for (let i = 0; i < this.cols; i++) {
      str += "\n| ";
      for (let j = 0; j < this.rows; j++) {
        str += this.board[i][j] + " ";
      }
      str += "|";
    }
    str += "\n- - - - -";
    console.log(str);
  }

  resetGame(): void {
    this.resetBoard();
    this.resetScore();
  }

  resetScore(): void {
    this.score = [0, 0];
  }

  resetBoard(): void {
    for (let i = 0; i < this.cols; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = Player.BLANK;
      }
    }
  }
}

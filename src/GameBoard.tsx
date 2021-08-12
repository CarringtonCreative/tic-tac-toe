export default interface GameBoard {
  rows: number,
  cols: number,
  board: [string[]],
  getBoard(): [string[]],
  printBoard(): void
}


import GameSquare from "./GameSquare";

export default interface GameBoard {
  rows: number;
  cols: number;
  board: [GameSquare[]];
  getBoard(): [GameSquare[]];
  printBoard(): void;
}

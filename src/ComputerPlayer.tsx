import Player from "./Player";
import Point from "./Point";

export default class ComputerPlayer extends Player {
  constructor() {
    super();
  }

  onMove = (rows: number, cols: number): Point => {
    const row = Math.floor((Math.random() * 100) % rows);
    const col = Math.floor((Math.random() * 100) % cols);
    return new Point(row, col);
  };
}

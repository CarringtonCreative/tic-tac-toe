export default class Point {
  private column: number;
  private row: number;

  constructor(row?: number, column?: number) {
    this.row = row || 0;
    this.column = column || 0;
  }

  getRow = (): number => this.row;
  getColumn = (): number => this.column;
}

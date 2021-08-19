export default class GameSquare {
  private hexColor: string;
  private column: number;
  private row: number;
  private value: string;

  constructor(
    row?: number,
    column?: number,
    value?: string,
    hexColor?: string
  ) {
    this.row = row || 0;
    this.column = column || 0;
    this.hexColor = hexColor || "#fff";
    this.value = value || "•";
  }

  getRow = (): number => this.row;
  getColumn = (): number => this.column;
  getHexColor = (): string => this.hexColor;
  setHexColor = (hexColor: string): void => {
    this.hexColor = hexColor;
  };
  getValue = (): string => this.value;
  setValue = (value: string): void => {
    this.value = value;
  };
}

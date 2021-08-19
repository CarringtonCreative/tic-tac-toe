import { v4 as uuidv4 } from "uuid";

export enum PLAYER_SYMBOL {
  X = "x",
  O = "o",
}

export default class Player {
  id: string;
  name: string;
  wins: number;
  loses: number;
  private symbol: string | PLAYER_SYMBOL;

  constructor(
    name?: string,
    symbol?: string | PLAYER_SYMBOL,
    wins?: number,
    loses?: number
  ) {
    this.id = uuidv4();
    this.name = name || "";
    this.symbol = symbol || "";
    this.wins = wins || 0;
    this.loses = loses || 0;
  }

  getSymbol = (): string => {
    return this.symbol;
  };

  setSymbol = (symbol: string | PLAYER_SYMBOL): void => {
    if (symbol.length > 2) {
      const message = "Update failed. Player's symbol can only be length of 1.";
      throw new Error(message);
    }
    this.symbol = symbol;
  };
}

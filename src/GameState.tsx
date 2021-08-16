export const STATES = {
  PAUSED: "paused",
  STOPPED: "stopped",
  STARTED: "started",
};

export default class GameState {
  private turn: number;
  private score: [number, number];
  private state: string;

  constructor(
    score: [number, number] = [0, 0],
    turn: number = 0,
    state: string = STATES.STOPPED
  ) {
    this.turn = turn;
    this.score = score;
    this.state = state;
  }

  getTurn = (): number => this.turn;
  getScore = (): [number, number] => this.score;
  getState = (): string => this.state;

  updateScore = (): void => {
    this.score = this.turn
      ? [this.score[0], ++this.score[1]]
      : [++this.score[0], this.score[1]];
  };

  updateTurn = (): void => {
    this.turn = this.turn ? 0 : 1;
  };
}

export const STATE = {
  PAUSED: { name: "paused", label: "Pause" },
  STOPPED: { name: "stopped", label: "Stop" },
  STARTED: { name: "started", label: "Start" },
};

export default class GameState {
  private turn: number;
  private score: [number, number];
  private state: string;

  constructor(
    score: [number, number] = [0, 0],
    turn: number = 0,
    state: string = STATE.STOPPED.name
  ) {
    this.turn = turn;
    this.score = score;
    this.state = state;
  }

  getTurn = (): number => this.turn;
  getScore = (): [number, number] => this.score;
  getState = (): string => this.state;

  updateState = (newState: string): string => {
    switch (newState) {
      case STATE.PAUSED.name:
        if (this.state === STATE.STARTED.name) {
          this.state = STATE.PAUSED.name;
        }
        break;
      case STATE.STARTED.name:
        if (
          this.state === STATE.PAUSED.name ||
          this.state === STATE.STOPPED.name
        ) {
          this.state = STATE.STARTED.name;
        }
        break;
      case STATE.STOPPED.name:
        if (
          this.state === STATE.PAUSED.name ||
          this.state === STATE.STARTED.name
        ) {
          this.state = STATE.STOPPED.name;
        }
        break;
    }
    return this.state;
  };

  updateScore = (): void => {
    this.score = this.turn
      ? [this.score[0], ++this.score[1]]
      : [++this.score[0], this.score[1]];
  };

  updateTurn = (): void => {
    this.turn = this.turn ? 0 : 1;
  };
}

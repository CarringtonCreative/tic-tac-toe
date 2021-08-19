export const STATE = {
  PAUSED: { name: "paused", label: "Pause" },
  STOPPED: { name: "stopped", label: "Stop" },
  STARTED: { name: "started", label: "Start" },
};

export default class GameState {
  private turn: number;
  private score: [number, number];
  private state: string;
  private winCondition: number[][];

  constructor(score?: [number, number], turn?: number, state?: string) {
    this.turn = turn || 0;
    this.score = score || [0, 0];
    this.state = state || STATE.STOPPED.name;
    this.winCondition = [];
  }

  getTurn = (): number => this.turn;

  getScores = (): [number, number] => Object.assign([...this.score]);

  getState = (): string => this.state;

  getWinCondition = (): string => Object.assign([...this.winCondition]);

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

  updateScore = (): [number, number] => {
    this.score = this.turn
      ? [this.score[0], ++this.score[1]]
      : [++this.score[0], this.score[1]];
    return this.score;
  };

  updateTurn = (): number => {
    this.turn = this.turn ? 0 : 1;
    return this.turn;
  };

  updateWinCondition = (data: number[][]): void => {
    if (!data) return;
    this.winCondition = data;
  };
}

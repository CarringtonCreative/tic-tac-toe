import React from "react";
import { PlayIcon, PauseIcon, ResetIcon, StopIcon } from "./icons";

export const STATE = {
  PAUSED: {
    name: "paused",
    label: "Pause",
    icon: <PauseIcon height={"1em"} width={"1em"} fill={"#fff"} />,
  },
  RESTARTED: {
    name: "restarted",
    label: "Restart",
    icon: <ResetIcon height={"1em"} width={"1em"} fill={"#fff"} />,
  },
  STOPPED: {
    name: "stopped",
    label: "Stop",
    icon: <StopIcon height={"1em"} width={"1em"} fill={"#fff"} />,
  },
  STARTED: {
    name: "started",
    label: "Start",
    icon: <PlayIcon height={"1em"} width={"1em"} fill={"#fff"} />,
  },
};

export const MODE = {
  PVP: { name: "pvp", label: "Player vs Player" },
  PVC: { name: "pvc", label: "Player vs Computer" },
  CVC: { name: "cvc", label: "Computer vs Computer" },
};

export default class GameState {
  private mode: { name: string; label: string };
  private turn: number;
  private score: number[];
  private state: string;
  private winCondition: number[][];

  constructor(
    score?: number[],
    turn?: number,
    state?: string,
    mode?: { name: string; label: string }
  ) {
    this.turn = turn || 0;
    this.score = score || [0, 0];
    this.state = state || STATE.STOPPED.name;
    this.winCondition = [];
    this.mode = mode || MODE.PVC;
  }

  getGameMode = (): { name: string; label: string } =>
    Object.assign({ ...this.mode });

  getTurn = (): number => this.turn;

  getScores = (): number[] => Object.assign([...this.score]);

  getState = (): string => this.state;

  getWinCondition = (): number[][] => Object.assign([...this.winCondition]);

  updateState = (newState: string): string => {
    switch (newState) {
      case STATE.PAUSED.name:
        if (this.state === STATE.STARTED.name) {
          this.state = STATE.PAUSED.name;
        }
        break;
      case STATE.RESTARTED.name:
        if (
          this.state === STATE.PAUSED.name ||
          this.state === STATE.STARTED.name ||
          this.state === STATE.STOPPED.name
        ) {
          this.state = STATE.RESTARTED.name;
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

  updateScore = (): number[] => {
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

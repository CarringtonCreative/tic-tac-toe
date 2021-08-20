type Props = {
  initializeCallback: (data: { time: number; formattedTime: string }) => void;
  stopCallback: (data: { time: number; formattedTime: string }) => void;
  startCallback: () => void;
};

export default class GameTimer {
  private interval: number;
  private time: number;
  private timerId: number;
  private totalIntervals: number;
  private formattedTime: string;

  constructor(time?: number, interval?: number) {
    this.interval = interval || 1000;
    this.time = time || 0;
    this.timerId = 0;
    this.totalIntervals = 0;
    this.formattedTime = "00:00:00";
  }

  private format = (): string => {
    // derivation: milliseconds / seconds / minutes / hours
    // ex: 100000 / 1000 / 60 / 60
    const time = this.time ? Number(this.time) / 1000 : this.time;
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 60 / 60) % 60;
    const secondsStr = this.formatDigit(seconds);
    const minutesStr = this.formatDigit(minutes);
    const hourssStr = this.formatDigit(hours);
    return hourssStr + ":" + minutesStr + ":" + secondsStr;
  };

  private formatDigit = (digit: number) => {
    return String(digit < 10 ? `0${digit}` : digit);
  };

  initialize = (callback?: Props["initializeCallback"]): void => {
    this.timerId = this.start(this.interval, () => {
      this.totalIntervals++;
      this.time += this.interval;
      this.formattedTime = this.format();
      callback &&
        callback({ time: this.time, formattedTime: this.formattedTime });
    });
  };

  pause = (): void => {
    clearInterval(this.timerId);
  };

  start = (interval: number, callback: Props["startCallback"]): number => {
    return window.setInterval(callback, interval);
  };

  stop = (callback?: Props["stopCallback"]): void => {
    clearInterval(this.timerId);
    this.reset();
    this.formattedTime = this.format();
    callback &&
      callback({ time: this.time, formattedTime: this.formattedTime });
  };

  reset = (): void => {
    this.totalIntervals = 0;
    this.time = 0;
    this.timerId = 0;
  };

  getInterval = (): number => this.interval;

  getTime = (): number => this.time;

  getTimerId = (): number => this.timerId;

  getTotalIntervals = (): number => this.totalIntervals;

  getFormattedTime = (): string => this.formattedTime;
}

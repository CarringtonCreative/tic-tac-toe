export default class GameTimer {
  private interval: number;
  private time: number;
  private timerId: number;
  private totalIntervals: number;

  constructor(time: number = 0, interval: number = 1000) {
    this.interval = interval;
    this.time = time;
    this.timerId = 0;
    this.totalIntervals = 0;
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

  getTotalIntervals = (): number => this.totalIntervals;

  initialize = (callback: Function): void => {
    this.timerId = this.start(this.interval, () => {
      this.totalIntervals++;
      this.time += this.interval;
      const formatedTime = this.format();
      callback({ time: this.time, formatedTime });
    });
  };

  pause = (): void => {
    clearInterval(this.timerId);
  };

  start = (interval: number, callback: Function): number => {
    return window.setInterval(callback, interval);
  };

  stop = (callback: Function): void => {
    clearInterval(this.timerId);
    this.reset();
    const formatedTime = this.format();
    callback({ time: this.time, formatedTime });
  };

  reset = (): void => {
    this.totalIntervals = 0;
    this.time = 0;
    this.timerId = 0;
  };
}

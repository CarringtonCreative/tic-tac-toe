import GameTimer from "../GameTimer";

describe("GameTimer - Tracks the amount of time that elapsed", () => {
  let instance: GameTimer;

  beforeEach(() => {
    instance = new GameTimer();
    expect(instance).toBeInstanceOf(GameTimer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new GameTimer instance w/ default instance variables", () => {
    const data = {
      interval: 1000,
      time: 0,
      timerId: 0,
      totalIntervals: 0,
      formattedTime: "00:00:00",
    };
    expect(instance.getInterval()).toEqual(data.interval);
    expect(instance.getTime()).toEqual(data.time);
    expect(instance.getTimerId()).toEqual(data.timerId);
    expect(instance.getTotalIntervals()).toEqual(data.totalIntervals);
    expect(instance.getFormattedTime()).toEqual(data.formattedTime);
  });

  it("should create a new GameTimer instance w/ defined instance variables", () => {
    const data = { interval: 1000, time: 3000 };
    instance = new GameTimer(data.time, data.interval);
    expect(instance).toBeInstanceOf(GameTimer);
    expect(instance.getInterval()).toEqual(data.interval);
    expect(instance.getTime()).toEqual(data.time);
  });

  it("should initialize GameTimer with a default interval", () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(window, "setInterval");
    instance.initialize((data) => expect(data).toBeDefined());
    expect(setIntervalSpy).toBeCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      instance.getInterval()
    );
  });

  it("should stop GameTimer after it is initialized", () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(window, "setInterval");
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    instance.initialize((data) => expect(data).toBeDefined());
    expect(setIntervalSpy).toBeCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      instance.getInterval()
    );
    instance.stop((data) => expect(data).toBeDefined());
    expect(clearIntervalSpy).toBeCalledTimes(1);
    expect(instance.getTimerId()).toBeDefined();
  });

  it("should pause GameTimer after it is initialized", () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(window, "setInterval");
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    instance.initialize((data) => expect(data).toBeDefined());
    expect(setIntervalSpy).toBeCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      instance.getInterval()
    );
    instance.pause();
    expect(clearIntervalSpy).toBeCalledTimes(1);
    expect(clearIntervalSpy).toHaveBeenLastCalledWith(instance.getTimerId());
    expect(instance.getTimerId()).toBeDefined();
  });

  it("should reset GameTimer after it is stopped", () => {
    jest.useFakeTimers();
    jest.spyOn(instance, "reset");
    const setIntervalSpy = jest.spyOn(window, "setInterval");
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    instance.initialize((data) => expect(data).toBeDefined());
    expect(setIntervalSpy).toBeCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      instance.getInterval()
    );
    instance.stop();
    expect(clearIntervalSpy).toBeCalledTimes(1);
    expect(instance.getTime()).toBeFalsy();
    expect(instance.getTimerId()).toBeFalsy();
    expect(instance.getTotalIntervals()).toBeFalsy();
    expect(instance.reset).toBeCalledTimes(1);
  });
});

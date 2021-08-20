import GameState, { STATE } from "../GameState";

describe("GameState stores the specifc conditions and outcome of a Game", () => {
  let instance: GameState;

  beforeEach(() => {
    instance = new GameState();
  });

  test("State enums", () => {
    expect(STATE.STOPPED.name).toEqual("stopped");
    expect(STATE.STARTED.name).toEqual("started");
    expect(STATE.PAUSED.name).toEqual("paused");

    expect(STATE.STOPPED.label).toEqual("Stop");
    expect(STATE.STARTED.label).toEqual("Start");
    expect(STATE.PAUSED.label).toEqual("Pause");
  });

  it("should create a new GameState instance w/ default instance variables", () => {
    expect(instance).toBeInstanceOf(GameState);
    expect(instance.getTurn()).toEqual(0);
    expect(instance.getState()).toEqual(STATE.STOPPED.name);
    expect.arrayContaining(instance.getScores());
    expect.arrayContaining(instance.getWinCondition());
  });

  it("should create a new GameState instance w/ defined instance variables", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect(instance.getTurn()).toEqual(data.turn);
    expect(instance.getState()).toEqual(STATE.STARTED.name);
    expect.arrayContaining(instance.getScores());
    expect.arrayContaining(instance.getWinCondition());
    expect(instance.getScores()[0]).toEqual(data.score[0]);
    expect(instance.getScores()[1]).toEqual(data.score[1]);
  });

  it("should update the state of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect(instance.getTurn()).toEqual(data.turn);
    expect(instance.getState()).toEqual(STATE.STARTED.name);
    instance.updateState(STATE.STOPPED.name);
    expect(instance.getState()).toEqual(STATE.STOPPED.name);
    instance.updateState(STATE.STARTED.name);
    expect(instance.getState()).toEqual(STATE.STARTED.name);
    instance.updateState(STATE.PAUSED.name);
    expect(instance.getState()).toEqual(STATE.PAUSED.name);
  });

  it("should update the score (pass by reference) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect(instance.getTurn()).toEqual(data.turn);
    expect.arrayContaining(instance.getScores());
    expect(instance.getScores()[0]).toEqual(data.score[0]);
    expect(instance.getScores()[1]).toEqual(data.score[1]);
    instance.updateScore();
    expect(instance.getScores()[1]).toEqual(data.score[1]);
  });

  it("should update the player turn (pass by value) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect(instance.getTurn()).toEqual(data.turn);
    instance.updateTurn();
    expect(instance.getTurn()).toBeFalsy();
    instance.updateTurn();
    expect(instance.getTurn()).toEqual(data.turn);
  });

  it("should update column win condition (pass by reference) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect.arrayContaining(instance.getWinCondition());
    const columnCondition = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    instance.updateWinCondition(columnCondition);
    expect.arrayContaining(instance.getWinCondition());
    expect(instance.getWinCondition()[0]).toEqual(columnCondition[0]);
    expect(instance.getWinCondition()[1]).toEqual(columnCondition[1]);
    expect(instance.getWinCondition()[2]).toEqual(columnCondition[2]);
  });

  it("should update row win condition (pass by reference) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect.arrayContaining(instance.getWinCondition());
    const rowCondition = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    instance.updateWinCondition(rowCondition);
    expect.arrayContaining(instance.getWinCondition());
    expect(instance.getWinCondition()[0]).toEqual(rowCondition[0]);
    expect(instance.getWinCondition()[1]).toEqual(rowCondition[1]);
    expect(instance.getWinCondition()[2]).toEqual(rowCondition[2]);
  });

  it("should update left diagonal win condition (pass by reference) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect.arrayContaining(instance.getWinCondition());
    const leftCondition = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    instance.updateWinCondition(leftCondition);
    expect.arrayContaining(instance.getWinCondition());
    expect(instance.getWinCondition()[0]).toEqual(leftCondition[0]);
    expect(instance.getWinCondition()[1]).toEqual(leftCondition[1]);
    expect(instance.getWinCondition()[2]).toEqual(leftCondition[2]);
  });

  it("should update right diagonal win condition (pass by reference) of GameState", () => {
    const data = { turn: 1, score: [1, 0], state: STATE.STARTED.name };
    instance = new GameState(data.score, data.turn, data.state);
    expect(instance).toBeInstanceOf(GameState);
    expect.arrayContaining(instance.getWinCondition());
    const rightCondition = [
      [2, 0],
      [1, 1],
      [0, 2],
    ];
    instance.updateWinCondition(rightCondition);
    expect.arrayContaining(instance.getWinCondition());
    expect(instance.getWinCondition()[0]).toEqual(rightCondition[0]);
    expect(instance.getWinCondition()[1]).toEqual(rightCondition[1]);
    expect(instance.getWinCondition()[2]).toEqual(rightCondition[2]);
  });
});

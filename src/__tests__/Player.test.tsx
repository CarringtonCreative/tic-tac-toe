import Player, { PLAYER_SYMBOL } from "../Player";

describe("Player", () => {
  let instance: Player;

  beforeEach(() => {
    instance = new Player();
  });

  it("should create a new Player instance w/ default instance variables", () => {
    expect(instance).toBeInstanceOf(Player);
    expect(instance.id).toBeDefined();
    expect(instance.loses).toEqual(0);
    expect(instance.wins).toEqual(0);
    expect(instance.name).toBeFalsy();
    expect(instance.getSymbol()).toBeFalsy();
  });

  it("should create a new Player instance w/ defined instance variables", () => {
    expect(instance).toBeInstanceOf(Player);
    const data = { name: "Michael Scott", symbol: "M", wins: 0, loses: 9 };
    instance = new Player(data.name, data.symbol, data.wins, data.loses);
    expect(instance).toBeInstanceOf(Player);
    expect(instance.id).toBeDefined();
    expect(instance.loses).toEqual(data.loses);
    expect(instance.wins).toEqual(data.wins);
    expect(instance.name).toEqual(data.name);
    expect(instance.getSymbol()).toEqual(data.symbol);
  });

  it("should create a new Player and assign a enum for their symbol", () => {
    expect(instance).toBeInstanceOf(Player);
    expect(instance.getSymbol()).toBeFalsy();
    expect(instance.setSymbol(PLAYER_SYMBOL.O));
    expect(instance.getSymbol()).toEqual(PLAYER_SYMBOL.O);
    expect(instance.getSymbol()).not.toBeFalsy();
    expect(instance.setSymbol(PLAYER_SYMBOL.X));
    expect(instance.getSymbol()).toEqual(PLAYER_SYMBOL.X);
    expect(instance.getSymbol()).not.toBeFalsy();
  });

  test("player symbol enums should have default X and O values", () => {
    expect(PLAYER_SYMBOL.X).toEqual("x");
    expect(PLAYER_SYMBOL.O).toEqual("o");
  });

  it("should set Player instance symbol", () => {
    expect(instance).toBeInstanceOf(Player);
    const data = { symbol: "M" };
    expect(instance.getSymbol()).toBeFalsy();
    expect(instance.setSymbol(data.symbol));
    expect(instance.getSymbol()).toEqual(data.symbol);
    expect(instance.getSymbol()).not.toBeFalsy();
  });

  it("should throw error if symbol lenght is greater than 2", () => {
    expect(() => {
      instance.setSymbol("");
    }).toThrow("Update failed. Player's symbol can only be length of 1.");

    expect(() => {
      instance.setSymbol("ABC");
    }).toThrow("Update failed. Player's symbol can only be length of 1.");
  });
});

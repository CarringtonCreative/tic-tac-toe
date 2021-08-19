import GameSquare from "../GameSquare";

describe("GameSquare", () => {
  let instance: GameSquare;

  beforeEach(() => {
    instance = new GameSquare();
  });

  it("should get a new GameSquare instance", () => {
    expect(instance).toBeInstanceOf(GameSquare);
    expect(instance.getRow()).toBeDefined();
    expect(instance.getColumn()).toBeDefined();
    expect(instance.getHexColor()).toBeDefined();
    expect(instance.getValue()).toBeDefined();
  });

  it("should get a new GameSquare instance w/ default instance variables", () => {
    expect(instance).toBeInstanceOf(GameSquare);
    const data = { row: 0, col: 0, hexColor: "#fff", value: "•" };
    const row = instance.getRow();
    const col = instance.getColumn();
    const hexColor = instance.getHexColor();
    const value = instance.getValue();
    expect(row).toEqual(data.row);
    expect(col).toEqual(data.col);
    expect(hexColor).toEqual(data.hexColor);
    expect(value).toEqual(data.value);
  });

  it("should create a new GameSquare instance w/ passed in arguments", () => {
    const data = { row: 3, col: 3, hexColor: "#bac", value: "x" };
    instance = new GameSquare(data.row, data.col, data.value, data.hexColor);
    expect(instance).toBeInstanceOf(GameSquare);
    const row = instance.getRow();
    const col = instance.getColumn();
    const hexColor = instance.getHexColor();
    const value = instance.getValue();
    expect(row).toEqual(data.row);
    expect(col).toEqual(data.col);
    expect(hexColor).toEqual(data.hexColor);
    expect(value).toEqual(data.value);
  });

  it("should set GameSquare accessible instance variables", () => {
    expect(instance).toBeInstanceOf(GameSquare);
    const data = { hexColor: "#cab", value: "o" };
    instance.setHexColor(data.hexColor);
    instance.setValue(data.value);
    const hexColor = instance.getHexColor();
    const value = instance.getValue();
    expect(hexColor).toEqual(data.hexColor);
    expect(value).toEqual(data.value);
  });
});

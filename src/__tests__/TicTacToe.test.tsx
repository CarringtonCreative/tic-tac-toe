import Player, { PLAYER_SYMBOL } from "../Player";
import TicTacToe, { GAME_SYMBOL } from "../TicTacToe";

describe("Tic-Tac-Toe", () => {
  let instance: TicTacToe;
  let player: Player;

  beforeEach(() => {
    instance = new TicTacToe();
    player = new Player();
    expect(instance).toBeInstanceOf(TicTacToe);
  });

  it("should create a new instance of TicTacToe w/ default instance variables", () => {
    const data = { board: [[]], rows: 3, cols: 3 };
    expect(instance.getBoard()).toBeDefined();
    expect(instance.getNumberOfRows()).toBeDefined();
    expect(instance.getNumberOfColumns()).toBeDefined();

    expect(instance.getNumberOfRows()).toEqual(data.rows);
    expect(instance.getNumberOfColumns()).toEqual(data.cols);
  });

  it("should initialize a new TicTacToe instance board", () => {
    const data = { rows: 3, cols: 3 };
    instance.initialize();
    const board = instance.getBoard();
    expect(board).toBeDefined();
    expect(board.length).toEqual(data.rows);
    expect(board[0].length).toEqual(data.cols);
  });

  it("should verify empty square, bounds for TicTacToe instance", () => {
    const data = { rows: 3, cols: 3 };
    instance.initialize();
    expect(instance.isEmptySquare(0, 0)).toBeTruthy();
    expect(instance.isValidSquare(data.rows - 1, data.cols - 1)).toBeTruthy();
    expect(instance.isValidSquare(data.rows, data.cols)).toBeFalsy();
  });

  it("should verify empty square that is fill is no longer empty", () => {
    const data = { rows: 0, cols: 0 };
    player.setSymbol(PLAYER_SYMBOL.X);
    instance.initialize();
    expect(instance.isEmptySquare(data.rows, data.cols)).toBeTruthy();
    instance.onFillSquare(data.rows, data.cols, player);
    expect(instance.isEmptySquare(data.rows, data.cols)).toBeFalsy();
  });

  it("should change square fill color", () => {
    const data = { rows: 0, cols: 0, color: "#fff" };
    player.setSymbol(PLAYER_SYMBOL.X);
    instance.initialize();
    expect(instance.getSquareColor(data.rows, data.cols)).toEqual(data.color);
    instance.onChangeSquareColor(data.rows, data.cols, "#cab");
    expect(instance.getSquareColor(data.rows, data.cols)).toEqual("#cab");
  });

  it("should override square value/player symbol", () => {
    const data = { rows: 0, cols: 0 };
    player.setSymbol(PLAYER_SYMBOL.X);
    instance.initialize();
    expect(instance.getSquare(data.rows, data.cols)).toEqual(GAME_SYMBOL.BLANK);
    instance.onOverrideSquare(data.rows, data.cols, player);
    expect(instance.getSquare(data.rows, data.cols)).toEqual(
      player.getSymbol()
    );
  });

  it("should get the number of empty squares", () => {
    instance.initialize();
    const totalSquares =
      instance.getNumberOfRows() * instance.getNumberOfColumns();
    expect(instance.getEmptySquares()).toBeDefined();
    expect(instance.getEmptySquares().length).toEqual(totalSquares);
    instance.onFillSquare(0, 0, player);
    expect(instance.getEmptySquares().length).toEqual(totalSquares - 1);
  });

  it("should reset the board after some square have been filled", () => {
    instance.initialize();
    const totalSquares =
      instance.getNumberOfRows() * instance.getNumberOfColumns();
    instance.onFillSquare(0, 0, player);
    instance.onFillSquare(0, 1, player);
    instance.onFillSquare(0, 2, player);
    expect(instance.getEmptySquares().length).toEqual(totalSquares - 3);
    instance.resetBoard();
    expect(instance.getEmptySquares().length).toEqual(totalSquares);
  });
});

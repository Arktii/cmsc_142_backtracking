import { Reference, waitFor } from "@motion-canvas/core";
import { Program } from "./program";
import { Board } from "./board";

export function ensureValidGrid(grid: number[][]) {
  for (let i = 0; i < 9; i++) {
    if (grid[i].length != 9) {
      throw new Error("Invalid grid");
    }
  }
}

export function isValid(
  grid: number[][],
  r: number,
  c: number,
  num: number,
  board: Reference<Board>,
) {
  // "highlight" tiles to be checked
  let x0 = Math.floor(r / 3) * 3;
  let y0 = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board().check(x0 + i, y0 + j, true);
    }
  }
  for (let i = 0; i < 9; i++) {
    board().check(r, i, true);
    board().check(i, c, true);
  }

  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === num || grid[i][c] === num) {
      return false;
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[x0 + i][y0 + j] === num) {
        return false;
      }
    }
  }
  return true;
}

export function* solve(
  board: Reference<Board>,
  r: number,
  c: number,
  program: Reference<Program>,
): Generator<any, boolean, unknown> {
  board().uncheckAll();
  if (r < 9 && c < 9) board().focus(r, c);

  yield* program().focusLine(0);
  yield* program().focusLine(1);
  if (r === 9) {
    yield* program().focusLine(2);
    return true;
  }

  yield* program().focusLine(3);
  if (c === 9) {
    yield* program().focusLine(4);
    if (r < 9 && c < 9) board().focus(r, c);
    return yield* solve(board, r + 1, 0, program);
  }

  yield* program().focusLine(5);
  if (board().grid()[r][c] !== 0) {
    yield* program().focusLine(6);
    if (r < 9 && c < 9) board().focus(r, c);
    return yield* solve(board, r, c + 1, program);
  }
  yield* program().focusLine(9);
  for (let k = 1; k <= 9; k++) {
    yield* program().focusLine(10);
    board().uncheckAll();
    board().tentative(r, c, k);

    if (isValid(board().grid(), r, c, k, board)) {
      yield* program().focusLine(11);
      board().set(r, c, k);

      // Yield and continue animation, making sure each recursive step is animated
      yield* program().focusLine(12);
      if (yield* solve(board, r, c + 1, program)) {
        board().tentative(r, c, 0);
        yield* program().focusLine(13);
        return true;
      }

      yield* program().focusLine(15);
      board().uncheckAll();
      board().tentative(r, c, 0);
      board().set(r, c, 0); // Reset the board state
    }
  }

  yield* program().focusLine(18);
  return false;
}

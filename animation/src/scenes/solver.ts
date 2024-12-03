import { Reference } from "@motion-canvas/core";
import { Program } from "./program";
import { Board } from "./board";

export function ensureValidGrid(grid: number[][]) {
  for (let i = 0; i < 9; i++) {
    if (grid[i].length != 9) {
      throw new Error("Invalid grid");
    }
  }
}

export function isValid(grid: number[][], r: number, c: number, num: number) {
  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === num || grid[i][c] === num) {
      return false;
    }
  }

  let x0 = Math.floor(r / 3) * 3;
  let y0 = Math.floor(c / 3) * 3;
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
  program: Reference<Program>
): Generator<any, boolean, unknown> {
  yield* program().focusLine(0);
  yield* program().focusLine(1);
  if (r === 9) {
    yield* program().focusLine(2);
    return true;
  } else if (c === 9) {
    yield* program().focusLine(4);
    return yield* solve(board, r + 1, 0, program);
  } else if (board().grid()[r][c] !== 0) {
    yield* program().focusLine(6);
    return yield* solve(board, r, c + 1, program);
  }

  yield* program().focusLine(9);
  for (let k = 1; k <= 9; k++) {
    yield* program().focusLine(10);
    if (isValid(board().grid(), r, c, k)) {
      yield* program().focusLine(11);
      board().set(r, c, k);

      // Yield and continue animation, making sure each recursive step is animated
      yield* program().focusLine(12);
      if (yield* solve(board, r, c + 1, program)) {
        yield* program().focusLine(13);
        return true;
      }

      yield* program().focusLine(15);
      board().set(r, c, 0); // Reset the board state
    }
  }

  yield* program().focusLine(18);
  return false;
}

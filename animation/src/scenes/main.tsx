import { makeScene2D, Rect } from "@motion-canvas/2d";
import { Board } from "./board";
import { Program } from "./program";
import { createRef } from "@motion-canvas/core";
import { solve } from "./solver";

export default makeScene2D(function* (view) {
  const program = createRef<Program>();
  const board = createRef<Board>();

  const grid = [
    [6, 9, 0, 1, 7, 0, 0, 0, 0],
    [3, 5, 0, 0, 4, 0, 1, 0, 0],
    [8, 0, 2, 3, 6, 0, 7, 0, 4],
    [0, 0, 0, 0, 0, 0, 9, 0, 8],
    [9, 4, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 5, 9, 0, 6, 3, 0],
    [2, 6, 0, 0, 5, 0, 0, 8, 7],
    [0, 8, 1, 0, 0, 6, 4, 9, 0],
    [0, 7, 3, 0, 8, 2, 0, 1, 0],
  ];

  view.add(
    <Rect
      layout
      width={"100%"}
      height={"100%"}
      fill={"#232634"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={100}
    >
      <Board ref={board} grid={grid} />

      <Program ref={program} />
    </Rect>,
  );

  yield* solve(board, 0, 0, program);
});

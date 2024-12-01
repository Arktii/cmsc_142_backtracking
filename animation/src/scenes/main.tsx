import { makeScene2D, Rect } from "@motion-canvas/2d";
import { Board } from "./board";
import { Program } from "./program";
import { createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const program = createRef<Program>();

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
      <Board />

      <Program ref={program} />
    </Rect>,
  );

  yield* program().moveLineTo(2);
  yield* program().moveLineTo(3);
  yield* program().moveLineTo(4);
  yield* program().moveLineTo(5);
});

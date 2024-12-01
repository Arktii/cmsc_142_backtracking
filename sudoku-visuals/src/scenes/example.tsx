import { makeScene2D, Rect } from "@motion-canvas/2d";
import { SudokuBoard } from "./components/board";
import { CodeSnippet } from "./components/code";

export default makeScene2D(function* (view) {
  const code = `
import {makeProject} from '@motion-canvas/core';
import example from './scenes/example?scene';
export default makeProject({
  scenes: [example],
});
  `;

  view.add(
    <Rect
      layout
      fill={"#012123"}
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={50}
    >
      <SudokuBoard />
      <CodeSnippet code={code} />
    </Rect>
  );
});

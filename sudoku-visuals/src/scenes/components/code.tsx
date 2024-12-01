import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { range } from "@motion-canvas/core";

interface CodeSnippetProps extends NodeProps {
  code: string;
}
export class CodeSnippet extends Node {
  public constructor(props?: CodeSnippetProps) {
    super({ ...props });
    const linesOfCode = props?.code.split("\n");
    this.add(
      <Rect
        layout
        fill={"#001012"}
        justifyContent={"start"}
        direction={"column"}
        gap={10}
      >
        {linesOfCode.map((line, index) => (
          <Rect>
            <Txt
              fontSize={32}
              stroke={"white"}
              fill={"white"}
              textAlign={"left"}
            >
              {line}
            </Txt>
          </Rect>
        ))}
      </Rect>
    );
  }
}

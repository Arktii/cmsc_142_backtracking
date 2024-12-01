import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

const tileSize = 50;
const tileGap = 4;
export class SubGrid extends Node {
  subGrid: number[][];

  public constructor(subGrid: { subGrid: number[][] }, props?: NodeProps) {
    super({ ...props });
    this.subGrid = subGrid.subGrid;

    this.add(
      <Rect direction={"column"} gap={tileGap}>
        <Rect direction={"row"} gap={tileGap}>
          <Tile value={this.subGrid[0][0]} />
          <Tile value={this.subGrid[0][1]} />
          <Tile value={this.subGrid[0][2]} />
        </Rect>
        <Rect direction={"row"} gap={tileGap}>
          <Tile value={this.subGrid[1][0]} />
          <Tile value={this.subGrid[1][1]} />
          <Tile value={this.subGrid[1][2]} />
        </Rect>
        <Rect direction={"row"} gap={tileGap}>
          <Tile value={this.subGrid[2][0]} />
          <Tile value={this.subGrid[2][1]} />
          <Tile value={this.subGrid[2][2]} />
        </Rect>
      </Rect>
    );
  }
}

export class Tile extends Node {
  value: number;

  public constructor(value: { value: number }, props?: NodeProps) {
    super({ ...props });
    this.value = value.value;

    this.add(
      <Rect
        width={tileSize}
        height={tileSize}
        fill="#fffff9"
        alignItems="center"
        justifyContent="center"
        radius={8}
      >
        <Txt
          fill="#012123"
          fontSize={36}
          fontWeight={"bold"}
          text={this.value === 0 ? " " : "" + this.value}
        />
      </Rect>
    );
  }
}

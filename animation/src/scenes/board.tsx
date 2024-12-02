import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";

const boardColor = "#303446";
const tileColor = "#585b70";

export class Board extends Node {
  public constructor(props: NodeProps & { grid: number[][] }) {
    super({});

    if (props.grid.length != 9 && props.grid[0].length != 9) {
      throw new Error("Invalid grid passed.");
    }

    const board = (
      <Rect
        layout
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        fill={boardColor}
        gap={4}
        height={850}
        width={850}
        radius={10}
      />
    );

    for (let i = 0; i < 9; i++) {
      const row = (
        <Rect
          layout
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
        />
      );

      for (let j = 0; j < 9; j++) {
        if (j % 3 == 0 && j != 0) {
          row.add(<Rect fill={boardColor} width={10} height={85} />);
        }

        const num = props.grid[i][j];

        row.add(
          <Rect
            fill={tileColor}
            width={85}
            height={85}
            radius={10}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Txt fill={"#949cbb"} fontWeight={700}>
              {String(num === 0 ? "" : num)}
            </Txt>
          </Rect>,
        );
      }

      if (i % 3 == 0 && i != 0) {
        board.add(<Rect fill={boardColor} width={85} height={10} />);
      }
      board.add(row);
    }

    this.add(board);
  }
}

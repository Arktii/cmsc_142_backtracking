import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { useRandom } from "@motion-canvas/core";

const boardColor = "#303446";
const tileColor = "#585b70";

export class Board extends Node {
  public constructor(props: NodeProps) {
    super(props);

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

    const random = useRandom();

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
              {String(random.nextInt(0, 10))}
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

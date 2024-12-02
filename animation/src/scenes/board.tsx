import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { ensureValidGrid } from "./solver";
import { createSignal, SimpleSignal } from "@motion-canvas/core";

const boardColor = "#303446";
const tileColor = "#585b70";

export class Board extends Node {
  private items: SimpleSignal<number, number>[][];

  public grid(): number[][] {
    // Create a grid and populate it with values from the signals
    let grid: number[][] = [];

    for (let r = 0; r < 9; r++) {
      const row: number[] = []; // Create a row for each row in the grid
      for (let c = 0; c < 9; c++) {
        row.push(this.items[r][c]()); // Access the signal value for each cell
      }
      grid.push(row); // Push the row to the grid
    }

    return grid; // Return the filled grid
  }

  public get(r: number, c: number): number {
    return this.items[r][c]();
  }

  public *set(r: number, c: number, k: number) {
    yield this.items[r][c](k);
  }

  public constructor(props: NodeProps & { grid: number[][] }) {
    ensureValidGrid(props.grid);

    super({});

    // Initialize items array with the correct size and signal values
    this.items = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => createSignal(props.grid[r][c])),
    );

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

        const num = this.items[i][j];

        row.add(
          <Rect
            fill={tileColor}
            width={85}
            height={85}
            radius={10}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Txt fill={"#949cbb"} fontWeight={700} text={num().toString()} />
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

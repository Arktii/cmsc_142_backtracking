import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { ensureValidGrid } from "./solver";
import { Tile } from "./tile";
import {
  createSignal,
  SimpleSignal,
  createRef,
  Reference,
} from "@motion-canvas/core";

const boardColor = "#303446";
const tileColor = "#585b70";

export class Board extends Node {
  private tileRefs: Reference<Tile>[][];
  private focusedTile: Reference<Tile>;

  public grid(): number[][] {
    // Create a grid and populate it with values from the signals
    let grid: number[][] = [];

    for (let r = 0; r < 9; r++) {
      const row: number[] = []; // Create a row for each row in the grid
      for (let c = 0; c < 9; c++) {
        row.push(this.tileRefs[r][c]().get()); // Access the signal value for each cell
      }
      grid.push(row); // Push the row to the grid
    }

    return grid; // Return the filled grid
  }

  public focus(r: number, c: number) {
    this.focusedTile().setFocus(false);
    this.focusedTile = this.tileRefs[r][c];
    this.focusedTile().setFocus(true);
  }

  public check(r: number, c: number, v: boolean) {
    this.tileRefs[r][c]().setCheck(v);
  }

  public uncheckAll() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.tileRefs[i][j]().setCheck(false);
      }
    }
  }

  public get(r: number, c: number): number {
    return this.tileRefs[r][c]().get();
  }

  public set(r: number, c: number, k: number) {
    this.focus(r, c);
    this.tileRefs[r][c]().set(k);
  }

  public tentative(r: number, c: number, k: number) {
    this.focusedTile().setTentative(0);
    this.focus(r, c);
    this.focusedTile().setTentative(k);
  }

  public constructor(props: NodeProps & { grid: number[][] }) {
    ensureValidGrid(props.grid);

    super({});

    this.tileRefs = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => createRef<Tile>())
    );
    this.focusedTile = this.tileRefs[0][0];

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

        row.add(<Tile ref={this.tileRefs[i][j]} value={props.grid[i][j]} />);
      }

      if (i % 3 == 0 && i != 0) {
        board.add(<Rect fill={boardColor} width={85} height={10} />);
      }
      board.add(row);
    }

    this.add(board);
  }
}

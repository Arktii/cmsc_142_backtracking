import { Code, lines, Node, NodeProps } from "@motion-canvas/2d";
import { createRef, Reference } from "@motion-canvas/core";

const code = `
function solve(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (possible(grid, i, j, k)) {
            grid[i][j] = k;
            if (solve(grid)) return true;
            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}
`;

export class Program extends Node {
  private block: Reference<Code>;

  public constructor(props: NodeProps) {
    super(props);

    this.block = createRef<Code>();
    this.add(<Code fontSize={32} code={code} ref={this.block} />);
  }

  public *moveLineTo(num: number) {
    yield* this.block().selection(lines(num), 0.6);
  }
}

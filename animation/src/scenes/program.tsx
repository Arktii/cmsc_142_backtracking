import { Code, lines, Node, NodeProps } from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  SimpleSignal,
  Reference,
} from "@motion-canvas/core";

const code = `function solve(grid, r, c) {
  if r = 9 {
    return true
  } else if c = 9 {
    return solve(grid, r + 1, 0)
  } else if grid[r][c] is not 0 {
    return solve(grid, r, c + 1)
  }

  for k in 1..9 {
    if isValid(grid, r, c, k) {
      grid[r][c] = k;
      if solve(grid, r, c + 1) {
        return true;
      }
      grid[r][c] = 0;
    }
  }
  return false
}`;

export class Program extends Node {
  private speed: number = 0.6;
  private delta: number = 0.003;
  private line: SimpleSignal<number, number>;
  private block: Reference<Code>;

  public constructor(props: NodeProps) {
    super(props);

    this.block = createRef<Code>();
    this.line = createSignal(0);
    this.add(<Code fontSize={32} code={code} ref={this.block} />);
  }

  public *focusLine(num: number) {
    yield* this.block().selection(lines(num), this.speed);

    if (this.speed > 0.01) {
      this.speed -= this.delta;
    }
  }
}

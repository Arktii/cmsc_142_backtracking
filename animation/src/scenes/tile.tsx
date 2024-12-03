import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import {
  createRef,
  Reference,
  SimpleSignal,
  createSignal,
} from "@motion-canvas/core";

const tileColor = "#585b70";
const activeTileColor = "#dce0e8";

const textColor = "#949cbb";
const activeTextColor = "#4c4f69";

export class Tile extends Node {
  private value: SimpleSignal<number, number>;
  private isFocused: SimpleSignal<number, number>;

  public get(): number {
    return this.value();
  }

  public set(k: number) {
    this.value(k);
  }

  public setFocus(n: number) {
    this.isFocused(n);
  }

  public constructor(props: NodeProps & { value: number }) {
    super({ ...props });
    this.value = createSignal(props.value);
    this.isFocused = createSignal(0);
    this.add(
      <Rect
        fill={createSignal(() =>
          this.isFocused() ? activeTileColor : tileColor
        )}
        width={85}
        height={85}
        radius={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Txt
          fill={createSignal(() =>
            this.isFocused() ? activeTextColor : textColor
          )}
          fontWeight={700}
          text={createSignal(() =>
            this.value() == 0 ? "" : String(this.value())
          )}
        />
      </Rect>
    );
  }
}

import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import {
  createRef,
  Reference,
  SimpleSignal,
  createSignal,
} from "@motion-canvas/core";

const tileColor = "#585b70";
const activeTileColor = "#9399b2";

export class Tile extends Node {
  private value: SimpleSignal<number, number>;

  public get(): number {
    return this.value();
  }

  public set(k: number) {
    this.value(k);
  }

  public constructor(props: NodeProps & { value: number }) {
    super({ ...props });
    this.value = createSignal(props.value);

    this.add(
      <Rect
        fill={tileColor}
        width={85}
        height={85}
        radius={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Txt
          fill={"#949cbb"}
          fontWeight={700}
          text={createSignal(() =>
            this.value() == 0 ? "" : String(this.value())
          )}
        />
      </Rect>
    );
  }
}

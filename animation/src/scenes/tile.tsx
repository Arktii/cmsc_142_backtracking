import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import {
  createRef,
  Reference,
  SimpleSignal,
  createSignal,
} from "@motion-canvas/core";

const tileColor = "#585b70";
const activeTileColor = "#dce0e8";
const checkingTileColor = "#40a02b30";

const textColor = "#949cbb";
const tentativeTextColor = "#949cbb";
const activeTextColor = "#4c4f69";

export class Tile extends Node {
  private value: SimpleSignal<number, number>;
  private isFocused: SimpleSignal<boolean, boolean>;
  private isBeingChecked: SimpleSignal<boolean, boolean>;
  private tentative: SimpleSignal<number, number>;

  public get(): number {
    return this.value();
  }

  public set(k: number) {
    this.value(k);
  }

  public setFocus(n: boolean) {
    this.isFocused(n);
  }

  public setCheck(n: boolean) {
    this.isBeingChecked(n);
  }

  public setTentative(n: number) {
    this.tentative(n);
  }

  public constructor(props: NodeProps & { value: number }) {
    super({ ...props });
    this.value = createSignal(props.value);
    this.isFocused = createSignal(false);
    this.isBeingChecked = createSignal(false);
    this.tentative = createSignal(0);
    this.add(
      <Rect
        fill={createSignal(() => {
          if (this.isFocused()) {
            return activeTileColor;
          } else if (this.isBeingChecked()) {
            return checkingTileColor;
          } else {
            return tileColor;
          }
        })}
        width={85}
        height={85}
        radius={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Txt
          fill={createSignal(() => {
            if (this.isFocused()) {
              return activeTextColor;
            } else if (this.tentative()) {
              return tentativeTextColor;
            } else {
              return textColor;
            }
          })}
          fontWeight={700}
          text={createSignal(
            () => {
              if (this.tentative()) {
                return String(this.tentative());
              } else if (this.value() == 0) {
                return "";
              } else {
                return String(this.value());
              }
            }
            // this.value() == 0 ? "" : String(this.value())
          )}
        />
      </Rect>
    );
  }
}

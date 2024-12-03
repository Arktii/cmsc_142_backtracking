import { Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { SimpleSignal, createSignal } from "@motion-canvas/core";

const tileColor = "#585b70";
const activeTileColor = "#dce0e8";
const checkingTileColor = "#dce0e820";
const clueTileColor = "#585b70";

const textColor = "#cdd6f4";
const tentativeTextColor = "#cad3f5";
const activeTextColor = "#4c4f69";

export class Tile extends Node {
  private value: SimpleSignal<number, number>;
  private isFocused: SimpleSignal<boolean, boolean>;
  private isBeingChecked: SimpleSignal<boolean, boolean>;
  private tentative: SimpleSignal<number, number>;
  private isClue: boolean = false;

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

  public constructor(
    props: NodeProps & { value: number } & { isClue: boolean }
  ) {
    super({ ...props });
    this.isClue = props.isClue;
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
            return this.isClue ? clueTileColor : tileColor;
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
          text={createSignal(() => {
            if (this.tentative()) {
              return String(this.tentative());
            } else if (this.value() == 0) {
              return "";
            } else {
              return String(this.value());
            }
          })}
        />
      </Rect>
    );
  }
}

import * as PIXI from "pixi.js";
import { Paylines } from "./globals";
import { symbolsArray } from "./reels";
export class drawPaylines extends PIXI.Container {
  // [x: string]: any;
  PaylinesArr: PIXI.Graphics[] = [];
  public FinalColsArr!: PIXI.Container[];

  constructor() {
    super();
    this.drawPayline();
    // this.PaylinesArr[21].visible = true
  }
  drawPayline() {
    Paylines.forEach((line) => {
      const Payline = new PIXI.Graphics();
      Payline.setStrokeStyle({
        width: 5,
        color: "yellow",
        join: "round",
        cap: "round",
        alignment: 0.5,
      });
      // Payline.
      let PreviosPos: { x: number; y: number } = { x: 0, y: 0 };
      line.forEach((value, col) => {
        if (col == 0) {
          const position =
            symbolsArray[col].children[value].getGlobalPosition();
          PreviosPos = { ...position };
        }
        Payline.moveTo(PreviosPos.x, PreviosPos.y);
        const position = symbolsArray[col].children[value].getGlobalPosition();
        Payline.lineTo(position.x, position.y);
        PreviosPos = { ...position };
      });
      Payline.endFill();
      Payline.visible = false;
      this.addChild(Payline);
      this.PaylinesArr.push(Payline);
    });
    // throw new Error("Method not implemented.");
  }
  showPayline(lineNum: number) {
    this.hidePaylines();
    this.PaylinesArr[lineNum - 1].visible = true;
  }
  hidePaylines() {
    this.PaylinesArr.forEach((line) => {
      line.visible = false;
    });
  }
}

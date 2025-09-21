import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { AppDimension } from "../config";

export class createInfoPage extends PIXI.Container {
  constructor() {
    super();
    this.createInfoPage();
    this.showInfo();
  }
  createInfoPage() {
    const InfoBgShape = new PIXI.Graphics();
    InfoBgShape.fill(0x000).rect(0, 0, AppDimension.width, AppDimension.height);
    InfoBgShape.endFill();
    InfoBgShape.alpha = 0.9;
    // InfoBgShape.pivot.set(InfoBgShape.width/2,InfoBgShape.height/2);
    this.addChild(InfoBgShape);

    const PaylineInfo = new PIXI.Sprite(Assets.get("desktop_payline"));
    PaylineInfo.anchor.set(0.5);
    PaylineInfo.scale.set(0.5);
    PaylineInfo.position.set(
      AppDimension.width / 2 - 50,
      AppDimension.height / 2,
    );
    this.addChild(PaylineInfo);

    const CloseBtn = new PIXI.Sprite(Assets.get("exit_Idle"));
    CloseBtn.anchor.set(0.5);
    CloseBtn.scale.set(0.5);
    CloseBtn.position.set(AppDimension.width - 100, 70);
    this.addChild(CloseBtn);
    CloseBtn.interactive = true;
    CloseBtn.cursor = "pointer";
    CloseBtn.on("pointertap", () => {
      this.visible = false;
    });
  }
  showInfo() {
    this.visible = true;
  }
}

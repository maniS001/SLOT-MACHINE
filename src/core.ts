import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { AppDimension } from "./config";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class GameCore extends PIXI.Container {
  constructor() {
    super();
    this.createBganim();
    this.createLogo();
  }
  createLogo() {
    const logo = new PIXI.Sprite(Assets.get("logo"));
    logo.anchor.set(0.5);
    logo.position.set(AppDimension.width / 2, 150);
    this.addChild(logo);
  }
  createBganim() {
    const MainBg_anim = Spine.from({
      skeleton: "BaseGame_BG_json",
      atlas: "BaseGame_BG_atlas",
      scale: 0.5,
    });
    MainBg_anim.x = AppDimension.width / 2;
    MainBg_anim.y = AppDimension.height / 2;
    MainBg_anim.state.setAnimation(0, "animation", true);
    this.addChild(MainBg_anim);
  }
}

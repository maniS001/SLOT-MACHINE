import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { AppDimension, ReelProperties } from "../config";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { ReelsGrid } from "./reels";
import { getFinalSymbols } from "../testWins";
import { drawPaylines } from "./paylines";
import { bottomButtons } from "./bottomButtons";

export class GameCore extends PIXI.Container {
  private TotalReelsGrid!: ReelsGrid;
  bottomBtnsContainer!: bottomButtons;

  constructor() {
    super();
    this.createBganim();
    this.createReelsGrid();
    this.createPaylines();
    this.createBottomButtons();
    this.createLogo();
  }
  createLogo() {
    const logo = new PIXI.Sprite(Assets.get("logo"));
    logo.anchor.set(0.5);
    logo.scale.set(0.7);

    logo.position.set(AppDimension.width / 2, 30);
    this.addChild(logo);
  }
  createBganim() {
    const MainBg_anim = Spine.from({
      skeleton: "BaseGame_BG_json",
      atlas: "BaseGame_BG_atlas",
      scale: 0.55,
    });
    MainBg_anim.x = AppDimension.width / 2;
    MainBg_anim.y = AppDimension.height / 2;
    MainBg_anim.state.setAnimation(0, "animation", true);
    this.addChild(MainBg_anim);
  }
  createBottomButtons() {
    const bottomBtnsContainer = new bottomButtons();
    this.addChild(bottomBtnsContainer);
    bottomBtnsContainer.x = AppDimension.width / 2;
    bottomBtnsContainer.y = 735;
    this.bottomBtnsContainer = bottomBtnsContainer;
    bottomBtnsContainer.tiggerSpin = this.SpinClickFun.bind(this);
  }

  createReelsGrid() {
    const TotalReelsGrid = new ReelsGrid(
      ReelProperties.row,
      ReelProperties.column,
    );
    TotalReelsGrid.position.set(
      AppDimension.width / 2,
      AppDimension.height / 2,
    );
    this.addChild(TotalReelsGrid);
    this.TotalReelsGrid = TotalReelsGrid;
    TotalReelsGrid.checkWin = this.checkWin.bind(this);
  }
  SpinClickFun() {
    if (this.TotalReelsGrid.reesSpinning) return;
    this.TotalReelsGrid.startSpin();
    this.bottomBtnsContainer.disableSpin();
    setTimeout(() => {
      this.TotalReelsGrid.stopSpin(getFinalSymbols());
    }, 3000);
  }
  createPaylines() {
    const PaylinesContainer = new drawPaylines();
    this.addChild(PaylinesContainer);
  }
  checkWin() {
    this.bottomBtnsContainer.enableSpin();
  }
}

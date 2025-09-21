import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { AppDimension, ReelProperties } from "../config";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { ReelsGrid } from "./reels";
import { getReelsData, ReelDataStructure } from "../testWins";
import { drawPaylines } from "./paylines";
import { bottomButtons } from "./bottomButtons";
import gsap from "gsap";
import { Bets } from "./globals";
import { sounds } from "./sounds";
export let Balance = 1000000;
export class GameCore extends PIXI.Container {
  private TotalReelsGrid!: ReelsGrid;
  bottomBtnsContainer!: bottomButtons;
  private ReelData!: ReelDataStructure;
  private PaylinesContainer!: drawPaylines;
  private currentWin!: PIXI.Text;
  constructor() {
    super();
    this.createBganim();
    this.createReelsGrid();
    this.createPaylines();
    this.createBottomButtons();
    this.createWinAtCenter();
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
    sounds.reels_spin_snd.play();
    Balance = Balance - Bets[this.bottomBtnsContainer.betIndex];
    this.bottomBtnsContainer.BalanceText.text = "$" + Balance.toFixed(2);
    this.bottomBtnsContainer.CummulativeWintext.text = "GoodLuck!";
    this.bottomBtnsContainer.CummulativeWintext.style.fontSize = 40;
    this.bottomBtnsContainer.TotalWintext.text = "$0.00";

    this.TotalReelsGrid.startSpin();
    this.bottomBtnsContainer.disableSpin();
    this.bottomBtnsContainer.DisableBet();

    setTimeout(() => {
      this.ReelData = getReelsData();
      this.TotalReelsGrid.stopSpin(this.ReelData.finalSymbols);
    }, 3000);
  }
  createPaylines() {
    const PaylinesContainer = new drawPaylines();
    this.addChild(PaylinesContainer);
    this.PaylinesContainer = PaylinesContainer;
  }

  createWinAtCenter() {
    const currentWin = new PIXI.Text({
      text: "$" + 100.0,
      style: {
        fontFamily: "Arial",
        fontSize: 70,
        fontWeight: "bold",
        fill: "#f3e306ff",
        stroke: "#000000",
        dropShadow: true,
      },
    });
    currentWin.anchor.set(0.5);
    currentWin.position.set(
      this.TotalReelsGrid.width / 2 - 20,
      this.TotalReelsGrid.height / 2 - 50,
    );
    this.addChild(currentWin);
    currentWin.visible = false;
    this.currentWin = currentWin;
  }
  showCurrentWin(text: number) {
    gsap.killTweensOf(this.currentWin);
    this.currentWin.text = "$" + text.toFixed(2);
    this.currentWin.scale.set(0);
    this.currentWin.alpha = 1;
    this.currentWin.visible = true;
    gsap.to(this.currentWin, {
      duration: 3,
      scale: 2,
      alpha: 0,
      onComplete: () => {
        this.currentWin.visible = false;
        this.currentWin.scale.set(0);
      },
    });
  }
  async checkWin() {
    if (this.ReelData.TotalWin > 0) {
      let CummulativeVal = 0;
      this.bottomBtnsContainer.CummulativeWintext.text = "";

      for (const [index, lineNum] of this.ReelData.payline.entries()) {
        this.PaylinesContainer.showPayline(lineNum);
        this.showCurrentWin(this.ReelData.win[index]);
        CummulativeVal += this.ReelData.win[index];
        this.bottomBtnsContainer.CummulativeWintext.style.fontSize = 30;
        this.bottomBtnsContainer.CummulativeWintext.text +=
          (this.bottomBtnsContainer.CummulativeWintext.text ? " + " : "") +
          "$" +
          this.ReelData.win[index].toFixed(2);
        this.bottomBtnsContainer.TotalWintext.text =
          "$" + CummulativeVal.toFixed(2);
        // this.bottomBtnsContainer
        sounds.lowPay_snd.play();
        await this.TotalReelsGrid.startWinAnimation(
          this.ReelData.winSymIndices[index],
        );
        this.PaylinesContainer.hidePaylines();
        if (index == this.ReelData.payline.length - 1) {
          this.roundEndFun();
        }
      }
    } else {
      // this.TotalReelsGrid.startIdleAnimation();
      // this.bottomBtnsContainer.enableSpin();
      this.roundEndFun();
    }
  }
  roundEndFun() {
    this.bottomBtnsContainer.enableSpin();
    this.TotalReelsGrid.startIdleAnimation();
    this.bottomBtnsContainer.EnableBet();
    Balance = Balance + this.ReelData.TotalWin;
    this.bottomBtnsContainer.BalanceText.text = "$" + Balance.toFixed(2);
    // gsap.killTweensOf(this.bottomBtnsContainer.CummulativeWintext);
    // this.bottomBtnsContainer.CummulativeWintext.scale.set(1)
    // this.bottomBtnsContainer.CummulativeWintext.style.fontSize = 30;
    // gsap.to(this.bottomBtnsContainer.CummulativeWintext,{scale:1.2,yoyo:true,repeat:1,onRepeat:()=>{
    // this.bottomBtnsContainer.CummulativeWintext.text = this.bottomBtnsContainer.TotalWintext.text;
    // }})
  }
}

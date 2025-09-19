import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { BrightnessFilter } from "./globals";
interface btnData {
  btnbg: PIXI.Texture;
  btnName: string;
  btnTxtImg?: PIXI.Texture;
  addText?: boolean;
  isInteractive: boolean;
  pointerTab?: () => void;
  X: number;
  Y: number;
}
type BottonBotton = {
  Text?: PIXI.Text;
} & PIXI.Container;
export class bottomButtons extends PIXI.Container {
  private btnBg = Assets.get("Frame");
  private spinBtnbg = Assets.get("Spin_Idle");
  // private infoBtnBg = Assets.get("Info_Idle");

  private BalanceTxt_img = Assets.get("Balance_Text");
  private WinTxt_img = Assets.get("Win_Text");
  private BetTxt_img = Assets.get("Bet_Text");
  // private BetarrowLeft_img = Assets.get("Arrow_L_Idle");
  // private BetarrowRight_img = Assets.get("Arrow_R_Idle");
  public tiggerSpin!: () => void;
  constructor() {
    super();
    this.createGoodluckArea();
    this.createBalanceArea();
    this.createTotalWinArea();
    this.createBetArea();
    this.createSpinButton();
  }
  createInfo() {}
  createGoodluckArea() {
    const GoodluckContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "Goodluck",
      isInteractive: false,
      X: 0,
      Y: -65,
    });
    this.addChild(GoodluckContainer);
  }
  createBalanceArea() {
    const BalanceContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "balance",
      isInteractive: false,
      btnTxtImg: this.BalanceTxt_img,
      addText: true,
      X: -300,
      Y: 0,
    });
    this.addChild(BalanceContainer);
  }
  createTotalWinArea() {
    const WintextContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "totalwin",
      isInteractive: false,
      btnTxtImg: this.WinTxt_img,
      addText: true,
      X: 0,
      Y: 0,
    });
    this.addChild(WintextContainer);
  }
  createBetArea() {
    const BetAreaContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "betarea",
      isInteractive: false,
      btnTxtImg: this.BetTxt_img,
      addText: true,
      X: 300,
      Y: 0,
    });
    this.addChild(BetAreaContainer);
  }
  createSpinButton() {
    const SpinButton = this.createButton({
      btnbg: this.spinBtnbg,
      btnName: "SpinBtn",
      isInteractive: true,
      // btnTxtImg:this.BetTxt_img,
      // addText:true,
      X: 500,
      Y: -50,
      pointerTab: () => {
        this.tiggerSpin();
      },
    });
    this.addChild(SpinButton);
  }
  createButton(data: btnData) {
    const button: BottonBotton = new PIXI.Container();
    const bg = new PIXI.Sprite(data.btnbg);
    bg.anchor.set(0.5);
    bg.scale.set(0.8);

    if (data.btnTxtImg) {
      const TextImg = new PIXI.Sprite(data.btnTxtImg);
      TextImg.anchor.set(0.5);
      bg.addChild(TextImg);
      TextImg.y = -15;
    }
    if (data.addText) {
      const valueText = new PIXI.Text({
        text: "$100.00",
        style: {
          fontSize: 20,
          fill: "#ffffff",
          dropShadow: {
            color: "black",
            distance: 5,
            alpha: 0.5,
            blur: 4,
          },
        },
      });
      valueText.anchor.set(0.5);
      bg.addChild(valueText);
      valueText.y = 15;
      button.Text = valueText;
    }
    if (data.isInteractive) {
      button.interactive = true;
      button.cursor = "pointer";

      button.on("pointerover", () => {
        bg.filters = [BrightnessFilter];
      });
      button.on("pointerover", () => {
        bg.filters = [];
      });
      button.on("pointerdown", () => {
        button.scale.set(0.95);
      });
      button.on("pointerup", () => {
        button.scale.set(1);
      });
      button.on("pointertap", data.pointerTab!);
    }
    button.addChild(bg);
    button.x = data.X;
    button.y = data.Y;
    return button;
  }
}

import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Bets, BrightnessFilter } from "./globals";

interface btnData {
  btnbg: PIXI.Texture;
  btnName: string;
  btnTxtImg?: PIXI.Texture;
  addText?: boolean;
  Text?: string;
  style?: PIXI.TextStyle;
  isInteractive: boolean;
  pointerTab?: () => void;
  X: number;
  Y: number;
}
type Bottombutton = {
  Text?: PIXI.Text;
  bg?: PIXI.Sprite;
} & PIXI.Container;
export class bottomButtons extends PIXI.Container {
  private btnBg = Assets.get("Frame");
  private spinBtnbg = Assets.get("Spin_Idle");
  private infoBtnBg = Assets.get("Info_Idle");
  private Arrow_L_Idle = Assets.get("Arrow_L_Idle");
  private Arrow_R_Idle = Assets.get("Arrow_R_Idle");

  private BalanceTxt_img = Assets.get("Balance_Text");
  private WinTxt_img = Assets.get("Win_Text");
  private BetTxt_img = Assets.get("Bet_Text");
  public SpinButton!: Bottombutton;
  public BetAreaContainer!: Bottombutton;
  private betIndex = 0;
  public tiggerSpin!: () => void;
  constructor() {
    super();
    this.createGoodluckArea();
    this.createBalanceArea();
    this.createTotalWinArea();
    this.createBetArea();
    this.createBetDecreaser();
    this.createBetIncreaser();
    this.createInfoBtn();
    this.createSpinButton();
  }
  createInfo() {}
  createGoodluckArea() {
    const GoodluckContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "Goodluck",
      Text: "GoodLuck",
      addText: true,
      style: new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fontWeight: "bold",
        fill: "#ffffff",
        stroke: "#000000",
        dropShadow: true,
      }),
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
      Text: "$1000",
      style: new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        fill: "#ffffff",
        stroke: "#000000",
        dropShadow: true,
      }),
      X: -300,
      Y: 0,
    });
    BalanceContainer.Text!.y = 15;
    this.addChild(BalanceContainer);
  }
  createTotalWinArea() {
    const WintextContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "totalwin",
      isInteractive: false,
      btnTxtImg: this.WinTxt_img,
      addText: true,
      style: new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        fill: "#ffffff",
        stroke: "#000000",
        dropShadow: true,
      }),
      Text: "$1000",
      X: 0,
      Y: 0,
    });
    WintextContainer.Text!.y = 15;
    this.addChild(WintextContainer);
  }
  createBetArea() {
    const BetAreaContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "betarea",
      isInteractive: false,
      btnTxtImg: this.BetTxt_img,
      addText: true,
      Text: "$" + Bets[this.betIndex],
      style: new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: "bold",
        fill: "#ffffff",
        stroke: "#000000",
        dropShadow: true,
      }),
      X: 300,
      Y: 0,
    });
    BetAreaContainer.Text!.y = 15;
    this.addChild(BetAreaContainer);
    this.BetAreaContainer = BetAreaContainer;
  }

  // Arrow_L_Idle
  // Arrow_R_Idle
  createBetIncreaser() {
    const betDecreseBtn = this.createButton({
      btnbg: this.Arrow_R_Idle,
      btnName: "betDecreaseBtn",
      isInteractive: true,
      X: 400,
      Y: 0,
      pointerTab: () => {
        this.betIndex++;
        if (this.betIndex > Bets.length - 1) {
          this.betIndex = 0;
        }
        this.BetAreaContainer.Text!.text = "$" + Bets[this.betIndex];
      },
    });
    // this.betDecreseBtn = betDecreseBtn;
    this.addChild(betDecreseBtn);
  }
  createBetDecreaser() {
    const betDecreseBtn = this.createButton({
      btnbg: this.Arrow_L_Idle,
      btnName: "betDecreaseBtn",
      isInteractive: true,
      X: 200,
      Y: 0,
      pointerTab: () => {
        this.betIndex--;
        if (this.betIndex < 0) {
          this.betIndex = Bets.length - 1;
        }
        this.BetAreaContainer.Text!.text = "$" + Bets[this.betIndex];
      },
    });
    // this.betDecreseBtn = betDecreseBtn;
    this.addChild(betDecreseBtn);
  }
  createInfoBtn() {
    const betDecreseBtn = this.createButton({
      btnbg: this.infoBtnBg,
      btnName: "betDecreaseBtn",
      isInteractive: false,
      X: -500,
      Y: 0,
      pointerTab: () => {},
    });
    // this.betDecreseBtn = betDecreseBtn;
    this.addChild(betDecreseBtn);
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
        SpinButton.bg!.texture = Assets.get("Spin_Disabled");
      },
    });
    this.SpinButton = SpinButton;
    this.addChild(SpinButton);
  }

  disableSpin() {
    this.SpinButton.interactive = false;
    this.SpinButton.bg!.texture = Assets.get("Spin_Disabled");
  }
  enableSpin() {
    this.SpinButton.interactive = true;
    this.SpinButton.bg!.texture = Assets.get("Spin_Idle");
  }
  createButton(data: btnData) {
    const button: Bottombutton = new PIXI.Container();
    const bg = new PIXI.Sprite(data.btnbg);
    bg.anchor.set(0.5);
    bg.scale.set(0.8);

    button.bg = bg;
    if (data.btnTxtImg) {
      const TextImg = new PIXI.Sprite(data.btnTxtImg);
      TextImg.anchor.set(0.5);
      bg.addChild(TextImg);
      TextImg.y = -15;
    }
    if (data.addText) {
      const valueText = new PIXI.Text({
        text: data.Text,
        style: data.style,
        // style: {
        //   fontSize: 20,
        //   fill: "#ffffff",
        //   dropShadow: {
        //     color: "black",
        //     distance: 5,
        //     alpha: 0.5,
        //     blur: 4,
        //   },
        // },
      });
      valueText.anchor.set(0.5);
      bg.addChild(valueText);
      // valueText.y = 15;
      button.Text = valueText;
    }
    if (data.btnName == "Goodluck") {
      // bg.texture.width = bg.texture.width*3
      // bg.children[0].scale.x = 3
    }
    if (data.isInteractive) {
      button.interactive = true;
      button.cursor = "pointer";

      button.on("pointerover", () => {
        button.filters = [BrightnessFilter];
      });
      button.on("pointerover", () => {
        button.filters = [];
      });
      button.on("pointerdown", () => {
        button.scale.set(0.95);
      });
      button.on("pointerup", () => {
        button.scale.set(1);
      });
      button.on("pointerupoutside", () => {
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

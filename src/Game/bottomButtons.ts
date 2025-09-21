import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Bets, BrightnessFilter } from "./globals";
import { Balance } from "./core";
// import { Balance } from "../testWins";

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
  public betIndex = 0;
  public CummulativeWintext!:PIXI.Text;
  public TotalWintext!:PIXI.Text;
  public BalanceText!:PIXI.Text
  public tiggerSpin!: () => void;
  betIncreaseBtn!: Bottombutton;
  betDecreaseBtn!: Bottombutton;
  constructor() {
    super();
    this.createGoodluckArea();
    this.createBalanceArea();
    this.createTotalWinArea();
    this.createBetArea();
    this.createBetDecreaser();
    this.createBetIncreaser();
    this.DisableBetDecreaseBtn()
    this.createInfoBtn();
    // this.DisableBetContainer()
    this.createSpinButton();
  }
  createInfo() {}
  createGoodluckArea() {
    const GoodluckContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "Goodluck",
      Text: "GoodLuck!",
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
    this.CummulativeWintext = GoodluckContainer.Text!
    this.addChild(GoodluckContainer);
  }
  createBalanceArea() {
    const BalanceContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "balance",
      isInteractive: false,
      btnTxtImg: this.BalanceTxt_img,
      addText: true,
      Text: "$"+(Balance.toFixed(2)),
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
    this.BalanceText = BalanceContainer.Text!
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
      Text: "$0.00",
      X: 0,
      Y: 0,
    });
    WintextContainer.Text!.y = 15;
    this.TotalWintext = WintextContainer.Text!
    this.addChild(WintextContainer);
  }
  createBetArea() {
    const BetAreaContainer = this.createButton({
      btnbg: this.btnBg,
      btnName: "betarea",
      isInteractive: false,
      btnTxtImg: this.BetTxt_img,
      addText: true,
      Text: "$" + (Bets[this.betIndex].toFixed(2)),
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
    const betIncreaseBtn = this.createButton({
      btnbg: this.Arrow_R_Idle,
      btnName: "betDecreaseBtn",
      isInteractive: true,
      X: 400,
      Y: 0,
      pointerTab: () => {
        this.betIndex++;
          this.EnableBetDecreaseBtn()

        if (this.betIndex == Bets.length - 1) {
          // this.betIndex = 0;
          this.DisableBetIncreaseBtn()
          // return
        }
        this.BetAreaContainer.Text!.text = "$" + (Bets[this.betIndex].toFixed(2));
      },
    });
    this.betIncreaseBtn = betIncreaseBtn;
    this.addChild(betIncreaseBtn);
  }
    DisableBetIncreaseBtn(){
    this.betIncreaseBtn.bg!.texture = Assets.get("Arrow_R_Disabled")
    this.betIncreaseBtn.interactive = false
  }
   EnableBetIncreaseBtn(){
    this.betIncreaseBtn.bg!.texture = Assets.get("Arrow_R_Idle")
    this.betIncreaseBtn.interactive = true
  } 

  createBetDecreaser() {
    const betDecreaseBtn = this.createButton({
      btnbg: this.Arrow_L_Idle,
      btnName: "betDecreaseBtn",
      isInteractive: true,
      X: 200,
      Y: 0,
      pointerTab: () => {
          this.EnableBetIncreaseBtn()     

        this.betIndex--;
        if (this.betIndex == 0) {
          // this.betIndex = Bets.length - 1;
          this.DisableBetDecreaseBtn()
          // return     
        }
        this.BetAreaContainer.Text!.text = "$" + (Bets[this.betIndex].toFixed(2));
      },
    });
    this.betDecreaseBtn = betDecreaseBtn;
    this.addChild(betDecreaseBtn);
  }

  DisableBetDecreaseBtn(){
    this.betDecreaseBtn.bg!.texture = Assets.get("Arrow_L_Disabled")
    this.betDecreaseBtn.interactive = false
  }
   EnableBetDecreaseBtn(){
    this.betDecreaseBtn.bg!.texture = Assets.get("Arrow_L_Idle")
    this.betDecreaseBtn.interactive = true
  } 
  DisableBet(){
    this.DisableBetDecreaseBtn()
    this.DisableBetIncreaseBtn()
  }
  EnableBet(){
    console.log(this.betIndex)
    if(this.betIndex==0){
      this.EnableBetIncreaseBtn()     
      this.DisableBetDecreaseBtn()
    }else if(this.betIndex==Bets.length-1){
      this.EnableBetDecreaseBtn();
      this.DisableBetIncreaseBtn()
    }else{
      this.EnableBetIncreaseBtn()     
      this.EnableBetDecreaseBtn();
    }
  }
  createInfoBtn() {
    const betDecreaseBtn = this.createButton({
      btnbg: this.infoBtnBg,
      btnName: "betDecreaseBtn",
      isInteractive: false,
      X: -500,
      Y: 0,
      pointerTab: () => {},
    });
    // this.betDecreaseBtn = betDecreaseBtn;
    this.addChild(betDecreaseBtn);
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
    if (data.btnName == "Goodluck") { 
      bg.texture = Assets.get("");
      const bg1 = new PIXI.Sprite(data.btnbg);
      bg1.anchor.set(0.5);
      bg1.scale.set(1);
      bg1.scale.x = 2;
      bg.addChild(bg1);     
    }

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

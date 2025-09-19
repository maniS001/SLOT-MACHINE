import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import gsap from "gsap";
import { ReelProperties } from "../config";
import { symbolAnims, symbolNames } from "./globals";
import { getSymbol } from "../testWins";

export class ReelsGrid extends PIXI.Container {
  private reels: PIXI.Container[][] = []; // symbols per column
  private reelColumnContainer: PIXI.Container[] = []; // column containers
  private ReelsContainer: PIXI.Container = new PIXI.Container();
  private isSpinning: boolean[] = []; // state per column
  private reelWidth = ReelProperties.symbolWidth;
  private symbolHeight = ReelProperties.symbolHeight;
  private FinalColsContainer = new PIXI.Container();
  private FinalColsArr: PIXI.Container[] = [];
  private speed = 0.075;
  private FinalSpineSymbols: Spine[] = [];
  public reesSpinning: boolean = false;
  constructor(
    private rows: number,
    private cols: number,
  ) {
    super();
    const reelsFrame = new PIXI.Sprite(Assets.get("reelFrame"));
    reelsFrame.anchor.set(0.5);
    reelsFrame.scale.set(0.85);

    const reelMask = new PIXI.Graphics();
    reelMask
      .fill(0x000)
      .rect(
        0,
        0,
        this.cols * (this.symbolHeight + ReelProperties.verticalGap),
        this.rows * (this.symbolHeight + ReelProperties.horizontalGap) + 12,
      );
    reelMask.endFill();
    reelMask.pivot.set(reelMask.width / 2, reelMask.height / 2);
    reelMask.alpha = 1;

    // reelMask.x = -reelMask.width/2;
    reelMask.y = this.symbolHeight + ReelProperties.horizontalGap; //reelMask.height/1.5;
    // reelsFrame.position.set(AppDimension.width / 2, AppDimension.height / 2);
    this.addChild(reelsFrame);
    this.createDummyReelsColumns();
    this.addChild(this.ReelsContainer);
    this.ReelsContainer.addChild(this.FinalColsContainer);
    this.ReelsContainer.addChild(reelMask);
    this.ReelsContainer.mask = reelMask;
    this.ReelsContainer.y = -197;
    this.createInitialSymbols();
    setTimeout(() => {
      // this.startSpin()
    }, 1000);
    setTimeout(() => {
      // this.stopSpin(dummyFinalSymbols)
    }, 5000);
  }

  /** Create empty containers for each reel column */

  /** Create a Spine symbol */
  private create_a_symbol(symbolName: string): Spine {
    const anim = symbolAnims[symbolName]["idle"];
    // const symbolContainer = new PIXI.Container();
    const symbol = Spine.from({
      skeleton: symbolName + "_json",
      atlas: symbolName + "_atlas",
      scale: this.reelWidth / 150,
    });
    symbol.state.timeScale = 0;
    symbol.state.setAnimation(0, anim, false);
    // symbolContainer.addChild(symbol);
    return symbol;
  }

  private createInitialSymbols() {
    for (let col = 0; col < this.cols; col++) {
      const colContainer = new PIXI.Container();
      for (let row = 0; row < this.rows; row++) {
        const symbolName = getSymbol(col, row);
        const symbol = this.create_a_symbol(symbolName);
        symbol.y = row * (this.symbolHeight + ReelProperties.horizontalGap);
        colContainer.addChild(symbol);
        this.FinalSpineSymbols.push(symbol);
      }
      colContainer.x =
        col * (this.reelWidth + ReelProperties.verticalGap) -
        ((this.cols - 1) * (this.reelWidth + ReelProperties.verticalGap)) / 2;
      this.FinalColsContainer.addChild(colContainer);
      this.FinalColsArr.push(colContainer);
    }
  }

  private spinIntialColumns(col: number) {
    // const speed = 0.15; // duration to move one symbol height

    gsap.to(this.FinalColsArr[col], {
      duration: (this.rows + 1) * this.speed,
      y: (this.rows + 1) * (this.symbolHeight + ReelProperties.horizontalGap),
      onComplete: (col) => {
        // this.FinalColsContainer.addChild(colContainer)
        this.FinalColsArr[col].y =
          -this.rows * (this.symbolHeight + ReelProperties.horizontalGap) -
          ReelProperties.horizontalGap;
        if (col == this.cols - 1) {
          // this.FinalSpineSymbols.forEach(element => {
          //   element.destroy()
          // });
        }
      },
      onCompleteParams: [col],
    });
    // this.FinalColsArr[col]
  }
  private createDummyReelsColumns() {
    for (let col = 0; col < this.cols; col++) {
      const colContainer = new PIXI.Container();
      this.reelColumnContainer.push(colContainer);
      this.ReelsContainer.addChild(colContainer);

      // place horizontally
      colContainer.x =
        col * (this.reelWidth + ReelProperties.verticalGap) -
        ((this.cols - 1) * (this.reelWidth + ReelProperties.verticalGap)) / 2;
      colContainer.y = 0;

      this.reels[col] = [];
      this.isSpinning[col] = false;
    }
  }
  /** Spin a column (precise loop) */
  private spinColumn(col: number) {
    const colContainer = this.reelColumnContainer[col];
    // const speed = 0.15; // duration to move one symbol height

    const spawnAndMove = () => {
      if (!this.isSpinning[col]) {
        this.showFinalSymbols(col);
        return;
      }
      // pick a dummy/random symbol (A, B, C for example)
      const symbol = this.create_a_symbol(this.randomSymbol());
      symbol.x = 0;
      symbol.y = -(this.symbolHeight + ReelProperties.horizontalGap); // just above top
      colContainer.addChild(symbol);

      // animate exactly one row distance downward repeatedly
      gsap.to(symbol, {
        y: (this.rows + 1) * (this.symbolHeight + ReelProperties.horizontalGap),
        duration: (this.rows + 1) * this.speed, // total journey through the reel
        ease: "none",
        onComplete: () => {
          colContainer.removeChild(symbol);
          symbol.destroy({ children: true, texture: true });
        },
      });

      // schedule the *next spawn* exactly when this symbol moves down by one row
      gsap.delayedCall(this.speed, spawnAndMove);
    };

    this.isSpinning[col] = true;
    spawnAndMove();
  }
  /** Fill initial grid with symbols */
  private showFinalSymbols(col: number) {
    // const speed = 0.15; // duration to move one symbol height

    gsap.to(this.FinalColsArr[col], {
      duration: (this.rows + 1) * this.speed,
      y: 0,
      ease: "elastic.out(1,0.75)",
      onComplete: (col) => {
        if (col == this.cols - 1) {
          console.log("show pay lines");
          this.reesSpinning = false;
        } // this.FinalColsContainer.addChild(colContainer)
      },
      onCompleteParams: [col],
    });
  }

  private updateFinalSymbols(finalSymbols: string[][]) {
    this.FinalColsContainer.children.forEach((colContainer, col) => {
      const container = colContainer as PIXI.Container;

      // Clear old symbols
      container
        .removeChildren()
        .forEach((c) => c.destroy({ children: true, texture: true }));
      // symbol.destroy({ children: true, texture: true });

      // Add new symbols
      finalSymbols[col].forEach((symbolName0, row) => {
        console.log(symbolName0);
        const symbolName = getSymbol(col, row);
        const symbol = this.create_a_symbol(symbolName);
        symbol.x = 0;
        symbol.y = row * (this.symbolHeight + ReelProperties.horizontalGap);
        container.addChild(symbol);
      });
    });
  }

  /** Start spin all reels */
  startSpin() {
    // const speed = 0.15; // duration to move one symbol height
    this.reesSpinning = true;
    // const delay =
    //   (this.symbolHeight + ReelProperties.horizontalGap) * this.speed;
    for (let col = 0; col < this.cols; col++) {
      // setTimeout(() => {
      setTimeout(() => {
        this.spinColumn(col);
        // }, delay);
        this.spinIntialColumns(col);
      }, col * 100);
    }
  }
  private randomSymbol() {
    const i = Math.floor(Math.random() * symbolNames.length);
    return symbolNames[i];
  }
  /** Stop spin and land on result symbols */
  stopSpin(finalSymbols: string[][]) {
    this.updateFinalSymbols(finalSymbols);
    for (let col = 0; col < this.cols; col++) {
      // after a short delay, drop in final result symbols
      setTimeout(() => {
        this.isSpinning[col] = false;
      }, col * 300); // stagger stops per column
    }
  }
}

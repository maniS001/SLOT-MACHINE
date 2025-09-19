import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import gsap from "gsap";
import { ReelProperties } from "../config";
import { dummyFinalSymbols, symbolAnims, symbolNames } from "./globals";


export class ReelsGrid extends PIXI.Container {
  private reels: PIXI.Container[][] = []; // symbols per column
  private reelColumnContainer: PIXI.Container[] = []; // column containers
  private ReelsContainer: PIXI.Container = new PIXI.Container();
  private isSpinning: boolean[] = []; // state per column
  private reelWidth = ReelProperties.symbolWidth;
  private symbolHeight = ReelProperties.symbolHeight;
  private FinalColsContainer = new PIXI.Container()
  private FinalColsArr:PIXI.Container[] = []
  
  constructor(private rows: number, private cols: number) {
    super();
    const reelsFrame = new PIXI.Sprite(Assets.get("reelFrame"));
    reelsFrame.anchor.set(0.5);
    reelsFrame.scale.set(0.85); 

    const reelMask = new PIXI.Graphics();
    reelMask.fill(0x000).rect(0,0,this.cols*(this.symbolHeight+ReelProperties.verticalGap),(this.rows)*(this.symbolHeight+ReelProperties.horizontalGap+12))
    reelMask.endFill()
    reelMask.pivot.set(reelMask.width/2,reelMask.height/2)
    // reelMask.x = -reelMask.width/2;
    reelMask.y = this.symbolHeight+ReelProperties.horizontalGap//reelMask.height/1.5;
    // reelsFrame.position.set(AppDimension.width / 2, AppDimension.height / 2);
    this.addChild(reelsFrame);    
    this.createReelContainers();
    this.addChild(this.ReelsContainer);
    this.ReelsContainer.addChild(this.FinalColsContainer)
    this.ReelsContainer.addChild(reelMask)
    this.ReelsContainer.mask = reelMask
    this.ReelsContainer.y = -190;
    this.createInitialSymbols();
    setTimeout(() => {
      // this.startSpin()
    }, 1000);
    setTimeout(() => {
      // this.stopSpin(dummyFinalSymbols)
    }, 5000);
  }

  /** Create empty containers for each reel column */
  private createReelContainers() {
    for (let col = 0; col < this.cols; col++) {
      const colContainer = new PIXI.Container();
      this.reelColumnContainer.push(colContainer);
      this.ReelsContainer.addChild(colContainer);

      // place horizontally
      colContainer.x = col * (this.reelWidth+ReelProperties.verticalGap) - ((this.cols - 1) * (this.reelWidth+ReelProperties.verticalGap)) / 2;
      colContainer.y = 0;

      this.reels[col] = [];
      this.isSpinning[col] = false;
    }
  }

  /** Create a Spine symbol */
  private create_a_symbol(symbolName: string): PIXI.Container {
    const anim = symbolAnims[symbolName]["idle"]
    const symbolContainer = new PIXI.Container();
    const symbol = Spine.from({
      skeleton: symbolName + "_json",
      atlas: symbolName + "_atlas",
      scale: this.reelWidth / 150,
    });
    symbol.state.timeScale = 0
    symbol.state.setAnimation(0, anim, false); 
    symbolContainer.addChild(symbol);
    return symbolContainer;
  }

/** Spin a column (precise loop) */
private spinColumn(col: number) {
  const colContainer = this.reelColumnContainer[col];
  const speed = 0.15; // duration to move one symbol height

  const spawnAndMove = () => {
    if (!this.isSpinning[col]) return; 
    // pick a dummy/random symbol (A, B, C for example)
    const symbol = this.create_a_symbol(this.randomSymbol());
    symbol.x = 0;
    symbol.y = -( this.symbolHeight+ReelProperties.horizontalGap); // just above top
    colContainer.addChild(symbol);

    // animate exactly one row distance downward repeatedly
    gsap.to(symbol, {
      y: (this.rows + 1) *( this.symbolHeight+ReelProperties.horizontalGap),
      duration: (this.rows + 1) * speed, // total journey through the reel
      ease: "none",
      onComplete: () => {
        colContainer.removeChild(symbol);
        symbol.destroy();
      },
    });

    // schedule the *next spawn* exactly when this symbol moves down by one row
    gsap.delayedCall(speed, spawnAndMove);
  };

  this.isSpinning[col] = true;
  spawnAndMove();
}
  /** Fill initial grid with symbols */
  private createInitialSymbols() {
    for (let col = 0; col < this.cols; col++) {
      const colContainer = new PIXI.Container();
      for (let row = 0; row < this.rows; row++) {
        const symbol = this.create_a_symbol(this.randomSymbol());
        symbol.y = row * ( this.symbolHeight+ReelProperties.horizontalGap);
        colContainer.addChild(symbol);

      }
        colContainer.x = col * (this.reelWidth+ReelProperties.verticalGap) - ((this.cols - 1) *(this.reelWidth+ReelProperties.verticalGap)) / 2;        
        this.FinalColsContainer.addChild(colContainer)      
        this.FinalColsArr.push(colContainer)

    }
  } 

private spinIntialColumns(col:number){
  const speed = 0.15; // duration to move one symbol height

  gsap.to(this.FinalColsArr[col],{
    duration:(this.rows + 1) * speed,
    y:(this.rows+1)*(this.symbolHeight+ReelProperties.horizontalGap)})
// this.FinalColsArr[col]        

}
  /** Start spin all reels */
  startSpin() {
  const speed = 0.15; // duration to move one symbol height
  const delay = ((this.symbolHeight+ReelProperties.horizontalGap))*speed
    for (let col = 0; col < this.cols; col++) {
      // setTimeout(() => {
      // setTimeout(() => {
        this.spinColumn(col);
      // }, delay);
        this.spinIntialColumns(col)
      // }, col*100);
    }
  }
  private randomSymbol() {
    const i = Math.floor(Math.random() * symbolNames.length);
    return symbolNames[i];
  }
  /** Stop spin and land on result symbols */
  stopSpin(finalSymbols: string[][]) {
    for (let col = 0; col < this.cols; col++) {

      // after a short delay, drop in final result symbols
      setTimeout(() => {
      this.isSpinning[col] = false;

        const colContainer = this.reelColumnContainer[col];

        finalSymbols[col].forEach((symbolName, row) => {
          const symbol = this.create_a_symbol(symbolName);
          symbol.x = 0;
          symbol.y = row * ( this.symbolHeight+ReelProperties.horizontalGap);
          colContainer.addChild(symbol);
        });
      }, col * 300); // stagger stops per column
    }
  }
}

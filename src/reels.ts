import * as PIXI from "pixi.js";
import { Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import gsap from "gsap";
import { ReelProperties } from "./config";

export class ReelsGrid extends PIXI.Container {
  private reels: PIXI.Container[][] = []; // store 2D array of symbols
  private reelColumnContainer: PIXI.Container[] = []; // store 2D array of symbols
  private reelstartY!: number;
  private reelendY!: number;
  private reelWidth = ReelProperties.symbolWidth; // symbol width (adjust based on your assets)
  private symbolHeight = ReelProperties.symbolHeight;
  private ReelsContainer: PIXI.Container = new PIXI.Container();
  constructor(
    private rows: number,
    private cols: number,
  ) {
    super();
    this.createReelContainers();
    this.createMainReels();
    this.addChild(this.ReelsContainer);
    // this.ReelsContainer.position.set(AppDimension.width / 2, AppDimension.height / 2);
    this.initiate_reel_rotation();
  }
  createReelContainers() {
    for (let col = 0; col < this.cols; col++) {
      const colContainer = new PIXI.Container();
      this.reelColumnContainer.push(colContainer);
    }
  }

  /** Add reel frame + symbols grid */
  createMainReels() {
    // frame
    const reelsFrame = new PIXI.Sprite(Assets.get("reelFrame"));
    reelsFrame.anchor.set(0.5);
    reelsFrame.scale.set(0.6);
    // reelsFrame.position.set(AppDimension.width / 2, AppDimension.height / 2);
    this.addChild(reelsFrame);

    // // grid of symbols
    for (let col = 0; col < this.cols; col++) {
      this.reels[col] = [];
      for (let row = 0; row < this.rows + ReelProperties.dummyRows; row++) {
        const symbolContainer: PIXI.Container & {
          destY?: number;
          startY?: number;
        } = this.create_a_symbol("A"); // dummy symbol
        symbolContainer.x =
          col * this.reelWidth - ((this.cols - 1) * this.reelWidth) / 2;
        symbolContainer.y =
          row * this.symbolHeight -
          ((this.rows + ReelProperties.dummyRows - 1) * this.symbolHeight) / 2;
        symbolContainer.destY = symbolContainer.y * 2;
        this.ReelsContainer.addChild(symbolContainer);
        this.reels[col].push(symbolContainer);
      }
    }
    this.reelstartY = this.reels[0][ReelProperties.dummyRows - 1].y;
    this.reelendY =
      this.reels[0][this.rows + ReelProperties.dummyRows - 1].y +
      this.symbolHeight;
  }
  /** Create a Spine symbol */
  create_a_symbol(symbolName: string): PIXI.Container {
    const symbolContainer = new PIXI.Container();
    const symbol = Spine.from({
      skeleton: symbolName + "_json",
      atlas: symbolName + "_atlas",
      scale: this.reelWidth / 150,
    });
    symbol.state.setAnimation(0, "STOP", true);
    symbolContainer.addChild(symbol);
    return symbolContainer;
  }
  /** Spin reels */
  initiate_reel_rotation() {
    for (let col = 0; col < this.cols; col++) {
      //   const symbols = this.reels[col];
      //   const moveDist = this.symbolHeight * this.rows * 2; // distance to scroll
      for (let row = 0; row < this.rows + ReelProperties.dummyRows; row++) {
        // const delay = 0; //(col+row) * 0.2; // stagger reel start
        gsap.to(this.reels[col][row], {
          duration: 1,
          delay: 1 / (col + row),
          y: this.reelendY,
          onComplete: (row, col) => {
            if (row >= this.rows) {
              this.rotateDummyreels(row, col);
              this.reels[col][row].y = this.reelstartY;
            } else {
              // this.reels[col][row].x = -10*col+10
            }
          },
          ease: "none",
          onCompleteParams: [row, col],
        });
      }
    }
  }

  // RotateReels(col:number){
  //         for (let row = 0; row < this.rows; row++) {
  //             const duration = 1/(row+1); // stagger reel start
  //             gsap.to(this.reels[col][row],{duration:duration,y:this.reelendY,onComplete:(row,col)=>{
  //                     // this.reels[col][0].y = this.reelstartY
  //                     // this.reels[col][0] = this.reels[col][row]
  //                     this.RotateReels(col)
  //                     this.rotateArray(this.reels[col])
  //                     this.reels[col][0].y = this.reelstartY

  //                 //     this.reels[col][row].y = this.reelstartY
  //                 // }
  //             },
  //             ease:"none",
  //             onCompleteParams:[row,col]
  //         })
  //         }
  // }

  // rotateArray(array:PIXI.Container[]){
  //     let temp = array[array.length-1];
  //     array.forEach((element,index) => {
  //       if((array.length-1-index)>1)
  //         array[array.length-1-index] = array[array.length-2-index]
  //       else{
  //         array[0] = temp;
  //       }
  //     });

  // }
  rotateDummyreels(row: number, col: number) {
    console.log(row, "row");
    const delay = 0; //(col+row) * 0.2; // stagger reel start

    // gsap.to(this.reels[col][row],{y:this.reelstartY})
    gsap.fromTo(
      this.reels[col][row],
      { y: this.reelstartY },
      {
        delay: delay,
        y: this.reelendY,
        duration: 1,
        ease: "none",
        onComplete: (row, col) => {
          // if(row==this.rows){
          // setTimeout(() => {
          this.rotateDummyreels(row, col);
          // }, row-ReelProperties.row);
          // this.reels[col][row].y = this.reelstartY
          // }
        },
        onCompleteParams: [row, col],
      },
    );
  }
}

import { Assets } from "pixi.js";
import * as PIXI from "pixi.js"

import { LoadGameAssets, LoadPreloadAssets } from "./loadAssets";
import { AppDimension } from "./config";
export class loadingPage extends PIXI.Container  {
    private loadingbar_fill_mask!:PIXI.Graphics;
     openGame!:()=>void
    constructor() {
        super();
        this.PreloadAssets();
    }
    async PreloadAssets() {
        await LoadPreloadAssets();
        const preloader_bg = new PIXI.Sprite(Assets.get("Loading_Screen_Background"));
        preloader_bg.anchor.set(0.5);
        preloader_bg.position.set(AppDimension.width/2,AppDimension.height/2)
        this.addChild(preloader_bg);

        const Game_Logo = new PIXI.Sprite(Assets.get("Game_Logo"));
        Game_Logo.anchor.set(0.5);
        Game_Logo.scale.set(0.5);
        Game_Logo.position.set(AppDimension.width/2,AppDimension.height/2-85)
        this.addChild(Game_Logo); 

        const LoadingBarContainer =  new PIXI.Container()
        LoadingBarContainer.position.set(AppDimension.width/2,AppDimension.height/2+150)
        this.addChild(LoadingBarContainer); 

        const loadingBar_empty = await new PIXI.Sprite(Assets.get("Loading_bar_empty_1"));
        loadingBar_empty.anchor.set(0.5);
        LoadingBarContainer.addChild(loadingBar_empty); 
        
        const loadingbar_fill = await new PIXI.Sprite(Assets.get("Loading_bar_fill_2"));
        loadingbar_fill.anchor.set(0,0.5);
        loadingbar_fill.position.set(-loadingbar_fill.width/2,0);
        LoadingBarContainer.addChild(loadingbar_fill); 
        
        const LoadingMask = new PIXI.Graphics()
        LoadingMask.fill(0x000000).rect(58,-25,loadingbar_fill.width-140,50).endFill()
        loadingbar_fill.addChild(LoadingMask)
        loadingbar_fill.mask = LoadingMask
        LoadingMask.scale.x = 0
        this.loadingbar_fill_mask = LoadingMask;

        
        const loadingBar_design = await new PIXI.Sprite(Assets.get("Loading_bar_design_3"));
        loadingBar_design.anchor.set(0.5);
        LoadingBarContainer.addChild(loadingBar_design);          



        const loadingText = await new PIXI.Sprite(Assets.get("Loading_text"));
        loadingText.anchor.set(0.5);
        loadingText.position.set(0,70)
        loadingText.scale.set(2);

        LoadingBarContainer.addChild(loadingText); 
        LoadingBarContainer.scale.set(0.5)
        this.loadAssets();


        // await 
    }

    async loadAssets() {
        await LoadGameAssets((percent:number)=>{ 
            this.loadingbar_fill_mask.scale.set(percent, 1)
            if(percent == 1){
                this.openGame();
            }
        })
    }
}
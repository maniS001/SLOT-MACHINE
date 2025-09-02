import { Assets } from "pixi.js";

export async function LoadPreloadAssets() {
    Assets.addBundle("preload-assets", { 
        // "logo":"./public/assets/logo.png", 
        "Game_Logo":"public/assets/loading-screen/Game_Logo.png",
        "Loading_bar_design_3":"public/assets/loading-screen/Loading_bar_design_3.png",
        "Loading_bar_empty_1":"public/assets/loading-screen/Loading_bar_empty_1.png",
        "Loading_bar_fill_2":"public/assets/loading-screen/Loading_bar_fill_2.png",
        "Loading_Screen_Background":"public/assets/loading-screen/Loading_Screen_Background.png",
        "Loading_text":"public/assets/loading-screen/Loading_text.png",


    });
   await Assets.loadBundle("preload-assets");
}
export async function LoadGameAssets() {
    const GameBundle_common = {
        // animations
        "BaseGame_BG_atlas":"./public/assets/Animations/background/BaseGame_BG.atlas",
        "BaseGame_BG_json":"./public/assets/Animations/background/BaseGame_BG.json",

        "paylines_atlas":"./public/assets/Animations/payline/paylines.atlas",
        "paylines_json":"./public/assets/Animations/payline/paylines.json",
 
        "10_json":"./public/assets/Animations/symbols/10.json",
        "10_atlas":"./public/assets/Animations/symbols/10.atlas",

        "A_json":"./public/assets/Animations/symbols/A.json",
        "A_atlas":"./public/assets/Animations/symbols/A.atlas",

        "Cash_Value_regular_json":"./public/assets/Animations/symbols/Cash_Value_regular.json",
        "Cash_Value_regular_atlas":"./public/assets/Animations/symbols/Cash_Value_regular.atlas",

        "HP1_json":"./public/assets/Animations/symbols/HP1.json",
        "HP1_atlas":"./public/assets/Animations/symbols/HP1.atlas",

        "HP2_json":"./public/assets/Animations/symbols/HP2.json",
        "HP2_atlas":"./public/assets/Animations/symbols/HP2.atlas",

        "HP4_json":"./public/assets/Animations/symbols/HP4.json",
        "HP4_atlas":"./public/assets/Animations/symbols/HP4.atlas",

        "J_json":"./public/assets/Animations/symbols/J.json",
        "J_atlas":"./public/assets/Animations/symbols/J.atlas",

        "K_json":"./public/assets/Animations/symbols/K.json",
        "K_atlas":"./public/assets/Animations/symbols/K.atlas",

        "LG_Wild_json":"./public/assets/Animations/symbols/LG_Wild.json",
        "LG_Wild_atlas":"./public/assets/Animations/symbols/LG_Wild.atlas",

        "Q_json":"./public/assets/Animations/symbols/Q.json",
        "Q_atlas":"./public/assets/Animations/symbols/Q.atlas",

        "RG_HP3_json":"./public/assets/Animations/symbols/RG_HP3.json",
        "RG_HP3_atlas":"./public/assets/Animations/symbols/RG_HP3.atlas",

        "Scatter_Regular_json":"./public/assets/Animations/symbols/Scatter_Regular.json",
        "Scatter_Regular_atlas":"./public/assets/Animations/symbols/Scatter_Regular.atlas",
            
        "bigwin_json":"./public/assets/Animations/win/bigwin.json",
        "bigwin_atlas":"./public/assets/Animations/win/bigwin.atlas",    
        
        // images- common

         "Autoplay":"public/assets/Game UI/Autoplay.png",
         "Balance":"public/assets/Game UI/Balance.png",
         "Bet":"public/assets/Game UI/Bet.png",
         "Frame":"public/assets/Game UI/Frame.png",
         "I":"public/assets/Game UI/I.png",
         "Minus":"public/assets/Game UI/Minus.png",
         "Plus":"public/assets/Game UI/Plus.png",
         "Spin":"public/assets/Game UI/Spin.png",
         "Win":"public/assets/Game UI/Win.png", 
        "logo":"public/assets/logo.png",
        "reelFrame":"public/assets/reelFrame.png",
        "win_bg":"public/assets/win_bg.png",         
    } 
    const GameBundle_PC = {
        "Arrow_L_Disabled":"public/assets/Game UI/desktop/Arrow_L_Disabled.png", 
        "Arrow_L_Hover":"public/assets/Game UI/desktop/Arrow_L_Hover.png", 
        "Arrow_L_Idle":"public/assets/Game UI/desktop/Arrow_L_Idle.png", 
        "Arrow_L_Pressed":"public/assets/Game UI/desktop/Arrow_L_Pressed.png", 
        "Arrow_R_Disabled":"public/assets/Game UI/desktop/Arrow_R_Disabled.png", 
        "Arrow_R_Hover":"public/assets/Game UI/desktop/Arrow_R_Hover.png", 
        "Arrow_R_Idle":"public/assets/Game UI/desktop/Arrow_R_Idle.png", 
        "Arrow_R_Pressed":"public/assets/Game UI/desktop/Arrow_R_Pressed.png", 
        "Balance_Text":"public/assets/Game UI/desktop/Balance_Text.png", 
        "Bet_Text":"public/assets/Game UI/desktop/Bet_Text.png", 
        "Frame":"public/assets/Game UI/desktop/Frame.png", 
        "Info_Disabled":"public/assets/Game UI/desktop/Info_Disabled.png", 
        "Info_Hover":"public/assets/Game UI/desktop/Info_Hover.png", 
        "Info_Idle":"public/assets/Game UI/desktop/Info_Idle.png", 
        "Info_Pressed":"public/assets/Game UI/desktop/Info_Pressed.png", 
        "Spin_Disabled":"public/assets/Game UI/desktop/Spin_Disabled.png", 
        "Spin_Hover":"public/assets/Game UI/desktop/Spin_Hover.png", 
        "Spin_Idle":"public/assets/Game UI/desktop/Spin_Idle.png", 
        "Spin_Pressed":"public/assets/Game UI/desktop/Spin_Pressed.png", 
        "Stop_Disabled":"public/assets/Game UI/desktop/Stop_Disabled.png", 
        "Stop_Hover":"public/assets/Game UI/desktop/Stop_Hover.png", 
        "Stop_Idle":"public/assets/Game UI/desktop/Stop_Idle.png", 
        "Stop_Pressed":"public/assets/Game UI/desktop/Stop_Pressed.png", 
        "Win_Text":"public/assets/Game UI/desktop/Win_Text.png",
    }

    const GameBundle = {...GameBundle_common,...GameBundle_PC}
    
    Assets.addBundle("Game-assets",GameBundle)
    await Assets.loadBundle("Game-assets");

}
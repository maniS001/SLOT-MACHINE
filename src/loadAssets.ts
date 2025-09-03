import { Assets } from "pixi.js";

export async function LoadPreloadAssets() {
  Assets.addBundle("preload-assets", {
    // "logo":"./assets/logo.png",
    Game_Logo: "./assets/loading-screen/Game_Logo.png",
    Loading_bar_design_3:
      "./assets/loading-screen/Loading_bar_design_3.png",
    Loading_bar_empty_1:
      "./assets/loading-screen/Loading_bar_empty_1.png",
    Loading_bar_fill_2: "./assets/loading-screen/Loading_bar_fill_2.png",
    Loading_Screen_Background:
      "./assets/loading-screen/Loading_Screen_Background.png",
    Loading_text: "./assets/loading-screen/Loading_text.png",
  });
  await Assets.loadBundle("preload-assets");
}
export async function LoadGameAssets() {
  const GameBundle_common = {
    // animations
    BaseGame_BG_atlas:
      "./assets/Animations/background/BaseGame_BG.atlas",
    BaseGame_BG_json: "./assets/Animations/background/BaseGame_BG.json",

    paylines_atlas: "./assets/Animations/payline/paylines.atlas",
    paylines_json: "./assets/Animations/payline/paylines.json",

    "10_json": "./assets/Animations/symbols/10.json",
    "10_atlas": "./assets/Animations/symbols/10.atlas",

    A_json: "./assets/Animations/symbols/A.json",
    A_atlas: "./assets/Animations/symbols/A.atlas",

    Cash_Value_regular_json:
      "./assets/Animations/symbols/Cash_Value_regular.json",
    Cash_Value_regular_atlas:
      "./assets/Animations/symbols/Cash_Value_regular.atlas",

    HP1_json: "./assets/Animations/symbols/HP1.json",
    HP1_atlas: "./assets/Animations/symbols/HP1.atlas",

    HP2_json: "./assets/Animations/symbols/HP2.json",
    HP2_atlas: "./assets/Animations/symbols/HP2.atlas",

    HP4_json: "./assets/Animations/symbols/HP4.json",
    HP4_atlas: "./assets/Animations/symbols/HP4.atlas",

    J_json: "./assets/Animations/symbols/J.json",
    J_atlas: "./assets/Animations/symbols/J.atlas",

    K_json: "./assets/Animations/symbols/K.json",
    K_atlas: "./assets/Animations/symbols/K.atlas",

    LG_Wild_json: "./assets/Animations/symbols/LG_Wild.json",
    LG_Wild_atlas: "./assets/Animations/symbols/LG_Wild.atlas",

    Q_json: "./assets/Animations/symbols/Q.json",
    Q_atlas: "./assets/Animations/symbols/Q.atlas",

    RG_HP3_json: "./assets/Animations/symbols/RG_HP3.json",
    RG_HP3_atlas: "./assets/Animations/symbols/RG_HP3.atlas",

    Scatter_Regular_json:
      "./assets/Animations/symbols/Scatter_Regular.json",
    Scatter_Regular_atlas:
      "./assets/Animations/symbols/Scatter_Regular.atlas",

    bigwin_json: "./assets/Animations/win/bigwin.json",
    bigwin_atlas: "./assets/Animations/win/bigwin.atlas",

    // images- common

    Autoplay: "assets/Game UI/Autoplay.png",
    Balance: "assets/Game UI/Balance.png",
    Bet: "assets/Game UI/Bet.png",
    Frame: "assets/Game UI/Frame.png",
    I: "assets/Game UI/I.png",
    Minus: "assets/Game UI/Minus.png",
    Plus: "assets/Game UI/Plus.png",
    Spin: "assets/Game UI/Spin.png",
    Win: "assets/Game UI/Win.png",
    logo: "assets/logo.png",
    reelFrame: "assets/reelFrame.png",
    win_bg: "assets/win_bg.png",
  };
  const GameBundle_PC = {
    Arrow_L_Disabled: "assets/Game UI/desktop/Arrow_L_Disabled.png",
    Arrow_L_Hover: "assets/Game UI/desktop/Arrow_L_Hover.png",
    Arrow_L_Idle: "assets/Game UI/desktop/Arrow_L_Idle.png",
    Arrow_L_Pressed: "assets/Game UI/desktop/Arrow_L_Pressed.png",
    Arrow_R_Disabled: "assets/Game UI/desktop/Arrow_R_Disabled.png",
    Arrow_R_Hover: "assets/Game UI/desktop/Arrow_R_Hover.png",
    Arrow_R_Idle: "assets/Game UI/desktop/Arrow_R_Idle.png",
    Arrow_R_Pressed: "assets/Game UI/desktop/Arrow_R_Pressed.png",
    Balance_Text: "assets/Game UI/desktop/Balance_Text.png",
    Bet_Text: "assets/Game UI/desktop/Bet_Text.png",
    Frame: "assets/Game UI/desktop/Frame.png",
    Info_Disabled: "assets/Game UI/desktop/Info_Disabled.png",
    Info_Hover: "assets/Game UI/desktop/Info_Hover.png",
    Info_Idle: "assets/Game UI/desktop/Info_Idle.png",
    Info_Pressed: "assets/Game UI/desktop/Info_Pressed.png",
    Spin_Disabled: "assets/Game UI/desktop/Spin_Disabled.png",
    Spin_Hover: "assets/Game UI/desktop/Spin_Hover.png",
    Spin_Idle: "assets/Game UI/desktop/Spin_Idle.png",
    Spin_Pressed: "assets/Game UI/desktop/Spin_Pressed.png",
    Stop_Disabled: "assets/Game UI/desktop/Stop_Disabled.png",
    Stop_Hover: "assets/Game UI/desktop/Stop_Hover.png",
    Stop_Idle: "assets/Game UI/desktop/Stop_Idle.png",
    Stop_Pressed: "assets/Game UI/desktop/Stop_Pressed.png",
    Win_Text: "assets/Game UI/desktop/Win_Text.png",
  };

  const GameBundle = { ...GameBundle_common, ...GameBundle_PC };

  Assets.addBundle("Game-assets", GameBundle);
  await Assets.loadBundle("Game-assets");
}

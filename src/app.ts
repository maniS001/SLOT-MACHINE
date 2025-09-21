import { Application } from "pixi.js";
import { AppDimension } from "./config.ts";
import { loadingPage } from "./loadingPage.ts";
import { GameCore } from "./Game/core.ts";
import { resizeApp } from "./resizer.ts";
import { sounds } from "./Game/sounds.ts";
// import { bottomButtons } from "./Game/bottomButtons.ts";

(async () => {
  // exports={};

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({
    background: "#1099bb",
    width: AppDimension.width,
    height: AppDimension.height,
  });
  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).__PIXI_APP__ = app;

  const PreloadContainer = new loadingPage();
  app.stage.addChild(PreloadContainer);

  function openGame() {
    const Game = new GameCore();
    app.stage.addChild(Game);
    Game.visible = false;

    setTimeout(() => {
      PreloadContainer.destroy();
      Game.visible = true;
      sounds.music_main_snd.play();
      // sounds.reels_spin_snd.play();   // start spinning loop
      // sounds.reel_stop_snd.play();
      // bottomBtnsContainer.visible = true;
    }, 500);
  }
  PreloadContainer.openGame = openGame;
  resizeApp(app);

  // await LoadPreloadAssets();
  // await LoadGameAssets();
})();

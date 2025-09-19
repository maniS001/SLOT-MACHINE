import { Application } from "pixi.js";
import { AppDimension } from "./config.ts";
import { loadingPage } from "./loadingPage.ts";
import { GameCore } from "./Game/core.ts";
import { resizeApp } from "./resizer.ts";
import { bottomButtons } from "./Game/bottomButtons.ts";

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
    const bottomBtnsContainer = new bottomButtons();
    app.stage.addChild(bottomBtnsContainer);
    bottomBtnsContainer.x = AppDimension.width / 2;
    bottomBtnsContainer.y = 735;
    bottomBtnsContainer.visible = false;
    bottomBtnsContainer.tiggerSpin = Game.SpinClickFun.bind(Game);

    setTimeout(() => {
      PreloadContainer.destroy();
      Game.visible = true;
      bottomBtnsContainer.visible = true;
    }, 500);
  }
  PreloadContainer.openGame = openGame;
  resizeApp(app);

  // await LoadPreloadAssets();
  // await LoadGameAssets();
})();

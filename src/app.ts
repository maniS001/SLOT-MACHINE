import { Application } from "pixi.js";
import { AppDimension } from "./config.ts";
import { loadingPage } from "./loadingPage.ts";
import { GameCore } from "./core.ts";
import { resizeApp } from "./resizer.ts";

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
    PreloadContainer.destroy();
    const Game = new GameCore();
    app.stage.addChild(Game);
  }
  PreloadContainer.openGame = openGame;
  resizeApp(app);

  // await LoadPreloadAssets();
  // await LoadGameAssets();
})();

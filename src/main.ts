import { Application, Assets, Sprite } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { LoadGameAssets, LoadPreloadAssets } from "./loadAssets.ts";

(async () => {
  // exports={};

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).__PIXI_APP__ = app;
  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  await LoadPreloadAssets();
  await LoadGameAssets();
  let x = 10

  const MainBg_anim = Spine.from({
    skeleton: "BaseGame_BG_json",
    atlas: "BaseGame_BG_atlas",
    scale: 0.5,
  });
  MainBg_anim.x = app.screen.width / 2;
  MainBg_anim.y = app.screen.height / 2;
  MainBg_anim.state.setAnimation(0, "animation", true);
  app.stage.addChild(MainBg_anim);

  const testImage = new Sprite(Assets.get("logo"));
  testImage.x = app.screen.width / 2;
  testImage.y = app.screen.height / 10;
  testImage.anchor.set(0.5);
  app.stage.addChild(testImage);
})();

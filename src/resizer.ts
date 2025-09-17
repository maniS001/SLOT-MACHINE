import * as PIXI from "pixi.js";
import { AppDimension } from "./config";

export function resizeApp(app: PIXI.Application) {
  (window.onresize = () => {
    const new_width = window.innerWidth / AppDimension.width;
    const new_height = window.innerHeight / AppDimension.height;
    const scale = Math.min(new_width, new_height);
    app.renderer.canvas.style.scale = scale + "";
    console.log("app resized");
  })();
  // window.onresize()
}

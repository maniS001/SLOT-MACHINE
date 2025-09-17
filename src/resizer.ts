import * as PIXI from "pixi.js";
import { AppDimension } from "./config";

export function resizeApp(app: PIXI.Application) {
  (window.onresize = () => {
    const new_width = window.innerWidth / AppDimension.width;
    const new_height = window.innerHeight / AppDimension.height;
    const scale = Math.min(new_width, new_height);
    if (window.matchMedia("(orientation:portrait)").matches) {
      app.renderer.canvas.style.scale = scale * 1.7 + "";
    } else {
      app.renderer.canvas.style.scale = scale + "";
    }
  })();
  // window.onresize()
}

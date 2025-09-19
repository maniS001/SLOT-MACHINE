import * as PIXI from "pixi.js";

export const BrightnessFilter = new PIXI.ColorMatrixFilter();
BrightnessFilter.brightness(1.3, true);
export const symbolNames = [
  "A",
  "HP1",
  "HP2",
  "HP4",
  "J",
  "K",
  "LG_Wild",
  "Q",
  "RG_HP3",
  "Scatter_Regular",
  "Cash_Value_regular",
];
export const symbolAnims: { [key: string]: { [key: string]: string } } = {
  "10": {
    win: "WIN",
    idle: "STOP",
  },
  A: {
    win: "WIN",
    idle: "STOP",
  },
  HP1: {
    win: "win",
    idle: "land",
  },
  HP2: {
    win: "win",
    idle: "land",
  },
  HP4: {
    win: "win",
    idle: "land",
  },
  J: {
    win: "WIN",
    idle: "STOP",
  },
  K: {
    win: "WIN",
    idle: "STOP",
  },
  LG_Wild: {
    win: "win2",
    idle: "land",
  },
  Q: {
    win: "WIN",
    idle: "STOP",
  },
  RG_HP3: {
    win: "win",
    idle: "land",
  },
  Scatter_Regular: {
    win: "win",
    idle: "idle",
    land: "land",
    // "split":"split",
    stop: "stop",
    tease_from_bottom: "tease_from_bottom",
    tease_from_middle: "tease_from_middle",
    tease_from_top: "tease_from_top",
    transform_merge: "transform_merge",
    transform_start: "transform_start",
    transform_stop: "transform_stop",
    transform_to_mega: "transform_to_mega",
  },
  Cash_Value_regular: {
    win: "win",
    idle: "idle",
    land: "land",
    split: "split",
    stop: "stop",
  },
};

export const dummyFinalSymbols = [
  ["A", "HP1", "HP2"],
  ["HP4", "J", "K"],
  ["RG_HP3", "Scatter_Regular", "Cash_Value_regular"],
  ["J", "K", "LG_Wild"],
  ["HP1", "HP2", "LG_Wild"],
];

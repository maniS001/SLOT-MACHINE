import { ReelProperties } from "./config";
import { symbolNames } from "./Game/globals";

// import { symbolNames } from "./symbols";
export const testPatterns: Record<string, string[][] | null> = {
  none: null, // default = random

  smallWin: [
    ["A", "K", "Q"],
    ["A", "A", "Q"],
    ["A", "J", "J"],
    ["Q", "J", "K"],
    ["HP2", "Q", "A"],
  ],

  bigWin: [
    ["LG_Wild", "LG_Wild", "LG_Wild"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
  ],

  megaWin: [
    ["HP1", "HP1", "HP1"],
    ["HP2", "HP2", "HP2"],
    ["HP4", "HP4", "HP4"],
    ["RG_HP3", "RG_HP3", "RG_HP3"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
  ],

  freeSpins: [
    ["Scatter_Regular", "Scatter_Regular", "Scatter_Regular"],
    ["K", "A", "Q"],
    ["HP1", "HP2", "HP4"],
    ["J", "Q", "K"],
    ["Cash_Value_regular", "Cash_Value_regular", "Cash_Value_regular"],
  ],
};
let selectedPattern: keyof typeof testPatterns = "none";

document
  .getElementById("testDropdown")
  ?.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedPattern = target.value as keyof typeof testPatterns;
    console.log("Selected test pattern:", selectedPattern);
  });

export function getSymbol(col: number, row: number): string {
  const pattern = testPatterns[selectedPattern];

  if (pattern) {
    return pattern[col][row];
  }

  // fallback random
  return symbolNames[Math.floor(Math.random() * symbolNames.length)];
}

export function getFinalSymbols(): string[][] {
  const finaySymbols:string[][] = []
  for (let i = 0; i < ReelProperties.column; i++) {
    finaySymbols.push([])
    for (let j = 0; j < ReelProperties.row; j++) {
      finaySymbols[i].push(getSymbol(i,j))
    }
  } 
  return finaySymbols 
}

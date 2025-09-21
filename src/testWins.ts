import { ReelProperties } from "./config";
import { symbolNames } from "./Game/globals";

export interface ReelDataStructure {
  win: number[];
  payline: number[];
  finalSymbols: string[][];
  winSymIndices: number[][];
  TotalWin: number;
  freespin: boolean;
}
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
    ["HP1", "A", "Q"],
    ["HP1", "A", "Q"],
    ["HP1", "A", "J"],
    ["Q", "J", "K"],
    ["HP2", "Q", "A"],
  ],

  megaWin: [
    ["HP1", "HP2", "HP4"],
    ["HP1", "HP2", "HP4"],
    ["HP1", "HP2", "HP4"],
    ["RG_HP3", "RG_HP3", "RG_HP3"],
    ["LG_Wild", "LG_Wild", "LG_Wild"],
  ],

  freeSpins: [
    ["Scatter_Regular", "Cash_Value_regular", "HP4"],
    ["K", "A", "Q"],
    ["HP1", "HP2", "Scatter_Regular"],
    ["J", "Q", "K"],
    ["Scatter_Regular", "Cash_Value_regular", "Cash_Value_regular"],
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

export function getReelsData(): ReelDataStructure {
  const ReelsData: ReelDataStructure = {
    win: [0],
    payline: [NaN],
    finalSymbols: [],
    TotalWin: 0,
    freespin: false,
    winSymIndices: [],
  };
  const finalSymbols: string[][] = [];
  for (let i = 0; i < ReelProperties.column; i++) {
    finalSymbols.push([]);
    for (let j = 0; j < ReelProperties.row; j++) {
      finalSymbols[i].push(getSymbol(i, j));
    }
  }
  ReelsData["finalSymbols"] = finalSymbols;
  if (selectedPattern == "smallWin") {
    ReelsData["win"] = [2, 2];
    ReelsData["payline"] = [2, 15];
    ReelsData["TotalWin"] = 4;
    ReelsData["winSymIndices"] = [
      [0, 3, 6],
      [0, 4, 6],
    ];
  } else if (selectedPattern == "bigWin") {
    ReelsData["win"] = [2, 30];
    ReelsData["payline"] = [1, 2];
    ReelsData["TotalWin"] = 32;
    ReelsData["winSymIndices"] = [
      [1, 4, 7],
      [0, 3, 6],
    ];
  } else if (selectedPattern == "megaWin") {
    ReelsData["win"] = [50, 30, 70];
    ReelsData["payline"] = [1, 2, 3];
    ReelsData["TotalWin"] = 150;
    ReelsData["winSymIndices"] = [
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
    ];
  } else if (selectedPattern == "freeSpins") {
    ReelsData["win"] = [0];
    ReelsData["payline"] = [NaN];
    ReelsData["TotalWin"] = 0;
    ReelsData["freespin"] = true;
    ReelsData["winSymIndices"] = [];
  }
  return ReelsData;
}

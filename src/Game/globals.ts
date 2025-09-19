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
]
export const symbolAnims:{[key:string]:{[key:string]:string}} = {
      "10":{
        "win":"WIN",
        "idle":"STOP"
    },
    "A":{
        "win":"WIN",
        "idle":"STOP"
    },
    "HP1":{
        "win":"win",
        "idle":"land"
    },
    "HP2":{
        "win":"win",
        "idle":"land"
    },
    "HP4":{
        "win":"win",
        "idle":"land"
    },
    "J":{
        "win":"WIN",
        "idle":"STOP"
    },
    "K":{
        "win":"WIN",
        "idle":"STOP"
    },
    "LG_Wild":{
        "win":"win2",
        "idle":"land"
    },
    "Q":{
        "win":"WIN",
        "idle":"STOP"
    },
    "RG_HP3":{
        "win":"win",
        "idle":"land"
    },
    "Scatter_Regular":{
         "win":"win",
        "idle":"idle",
        "land":"land",
        // "split":"split",
        "stop":"stop", 
        "tease_from_bottom":"tease_from_bottom", 
        "tease_from_middle":"tease_from_middle", 
        "tease_from_top":"tease_from_top", 
        "transform_merge":"transform_merge", 
        "transform_start":"transform_start", 
        "transform_stop":"transform_stop", 
        "transform_to_mega":"transform_to_mega", 
    },
    "Cash_Value_regular":{
        "win":"win",
        "idle":"idle",
        "land":"land",
        "split":"split",
        "stop":"stop", 
    },  
}



export const normalWinSymbols = [
  ["A", "HP1", "A"],
  ["J", "A", "K"],
  ["RG_HP3", "A", "Cash_Value_regular"],
  ["J", "HP2", "K"],
  ["HP1", "LG_Wild", "HP4"],
]
export const bigWinSymbols = [
  ["HP1", "LG_Wild", "HP1"],
  ["K", "HP1", "J"],
  ["HP1", "RG_HP3", "Cash_Value_regular"],
  ["HP1", "J", "K"],
  ["LG_Wild", "HP2", "HP4"],
];
export const megaWinSymbols = [
  ["HP2", "HP2", "HP2"],
  ["HP2", "J", "K"],
  ["HP2", "RG_HP3", "Cash_Value_regular"],
  ["HP2", "LG_Wild", "A"],
  ["HP2", "HP4", "J"],
];
export const freeSpinsSymbols = [
  ["Scatter_Regular", "HP1", "J"],
  ["K", "Scatter_Regular", "A"],
  ["HP2", "RG_HP3", "Scatter_Regular"],
  ["LG_Wild", "J", "HP4"],
  ["HP1", "Cash_Value_regular", "K"],
];

 export const dummyFinalSymbols = freeSpinsSymbols;
 
 [
    [
    "A",
    "HP1",
    "HP2",        
    ],
    [
    "HP4",
    "J",
    "K",        
    ],
    [
    "RG_HP3",
    "Scatter_Regular",
    "Cash_Value_regular",       
    ],
    [
    "J",
    "K",
    "LG_Wild",  
    ],
    [
    "HP1",
    "HP2",
    "LG_Wild",        
    ]
]

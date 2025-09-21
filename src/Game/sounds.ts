import { Howl } from "howler";

export const sounds = {
  bigwin_snd: new Howl({ src: ["assets/sounds/bigwin.wav"] }),
  bigwin_in_snd: new Howl({ src: ["assets/sounds/bigwin_in.wav"] }),
  bigwin_out_snd: new Howl({ src: ["assets/sounds/bigwin_out.wav"] }),
  bonus_land_snd: new Howl({ src: ["assets/sounds/bonus_land.wav"] }),
  bonusWin_snd: new Howl({ src: ["assets/sounds/bonusWin.wav"] }),
  error_snd: new Howl({ src: ["assets/sounds/error.wav"] }),
  general_button_snd: new Howl({ src: ["assets/sounds/general_button.wav"] }),
  highPay1_snd: new Howl({ src: ["assets/sounds/highPay1.wav"] }),
  highPay2_snd: new Howl({ src: ["assets/sounds/highPay2.wav"] }),
  highPay3_snd: new Howl({ src: ["assets/sounds/highPay3.wav"] }),
  highPay4_snd: new Howl({ src: ["assets/sounds/highPay4.wav"] }),
  lowPay_snd: new Howl({ src: ["assets/sounds/lowPay.wav"] }),
  megawin_snd: new Howl({ src: ["assets/sounds/megawin.wav"] }),
  megawin_in_snd: new Howl({ src: ["assets/sounds/megawin_in.wav"] }),
  megawin_out_snd: new Howl({ src: ["assets/sounds/megawin_out.wav"] }),
  music_main_snd: new Howl({
    src: ["assets/sounds/music_main.wav"],
    loop: true,
    volume: 0.25,
  }),
  reel_stop_snd: new Howl({ src: ["assets/sounds/reel_stop.wav"] }),
  reels_spin_snd: new Howl({
    src: ["assets/sounds/reels_spin.wav"],
    loop: true,
  }),
  scatter_land_snd: new Howl({ src: ["assets/sounds/scatter_land.wav"] }),
  superwin_snd: new Howl({ src: ["assets/sounds/superwin.wav"] }),
  superwin_in_snd: new Howl({ src: ["assets/sounds/superwin_in.wav"] }),
  superwin_out_snd: new Howl({ src: ["assets/sounds/superwin_out.wav"] }),
  wild_landing_snd: new Howl({ src: ["assets/sounds/wild_landing.wav"] }),
  win_counter_snd: new Howl({ src: ["assets/sounds/win_counter.wav"] }),
};

// ✅ Example usage
// sounds.music_main_snd.play();
// sounds.reel_stop_snd.play();

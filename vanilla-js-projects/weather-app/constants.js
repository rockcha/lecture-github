// constants.js
const IMG = Object.freeze({
  clear: "./imgs/clear.png",
  cloudy: "./imgs/cloudy.png",
  fog: "./imgs/fog.png",
  rain: "./imgs/rain.png",
  snow: "./imgs/snow.png",
  unknown: "./imgs/unknown.png",
});

export const WC = Object.freeze({
  0: { path: IMG.clear, text: "맑음" },

  1: { path: IMG.cloudy, text: "구름" },
  2: { path: IMG.cloudy, text: "구름" },
  3: { path: IMG.cloudy, text: "구름" },

  45: { path: IMG.fog, text: "안개" },
  48: { path: IMG.fog, text: "안개" },

  // 비로 통일
  51: { path: IMG.rain, text: "비" },
  53: { path: IMG.rain, text: "비" },
  55: { path: IMG.rain, text: "비" },
  56: { path: IMG.rain, text: "비" },
  57: { path: IMG.rain, text: "비" },
  61: { path: IMG.rain, text: "비" },
  63: { path: IMG.rain, text: "비" },
  65: { path: IMG.rain, text: "비" },
  66: { path: IMG.rain, text: "비" },
  67: { path: IMG.rain, text: "비" },
  80: { path: IMG.rain, text: "비" },
  81: { path: IMG.rain, text: "비" },
  82: { path: IMG.rain, text: "비" },
  95: { path: IMG.rain, text: "비" },
  96: { path: IMG.rain, text: "비" },
  99: { path: IMG.rain, text: "비" },

  // 눈
  71: { path: IMG.snow, text: "눈" },
  73: { path: IMG.snow, text: "눈" },
  75: { path: IMG.snow, text: "눈" },
  77: { path: IMG.snow, text: "눈" },
  85: { path: IMG.snow, text: "눈" },
  86: { path: IMG.snow, text: "눈" },
});

export function getWmoMeta(code) {
  const c = Number(code);
  return WC[c] ?? { path: IMG.unknown, text: `알 수 없음(${code})` };
}

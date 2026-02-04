import { createColorBox } from "./colorBox.js";

const INITIAL_COLORS = ["#FFC1D1", "#FFE08A", "#A7D8F0", "#AEE6CF"];

const BOX_COUNT = INITIAL_COLORS.length;

//dom

const $box_container = document.querySelector(".box-container");
const $gen_btn = document.getElementById("gen-btn");

//컴포넌트 생성

$box_container.innerHTML = ``;

const boxes = INITIAL_COLORS.map((color) => {
  const box = createColorBox(color);
  $box_container.appendChild(box.boxEl);

  return box;
});

console.log(boxes);

//이벤트 바인딩

$gen_btn.addEventListener("click", () => {
  // 랜덤 색상 4가지
  const nextColors = Array.from({ length: BOX_COUNT }, getRandomColor);

  paint(nextColors);
});

function paint(colors) {
  //setColor에 각각의 색상 주입
  boxes.forEach((box, idx) => {
    box.setColor(colors[idx]);
  });
}

//랜덤 색상 생성
//hex 코드 # _ _ _ _ _ _
function getRandomColor() {
  let hex = "#";
  const DIGITS = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    hex += DIGITS[Math.floor(Math.random() * DIGITS.length)];
  }

  return hex;
}

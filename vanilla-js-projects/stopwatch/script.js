import { byId } from "./helper.js";

//3가지 상태

// idle , playing , paused

const STATUS_LABEL = Object.freeze({
  idle: "쉬는 중...😴",
  playing: "진행 중...⏱️",
  paused: "일시정지 중...⌛",
});

let current_status = "idle";

//타이머 관련

let timer = null;

let minutes = 0;
let seconds = 0;
let tens = 0;

//dom 요소

const $status_label = byId("status-label");
const $btnSection = byId("btn-section");

const $play_btn = byId("play-btn");
const $pause_btn = byId("pause-btn");
const $reset_btn = byId("reset-btn");

const $minutes = byId("minutes");
const $seconds = byId("seconds");
const $tens = byId("tens");

init();
function init() {
  //이벤트 위임
  $btnSection.addEventListener("click", (e) => {
    const $btn = e.target.closest(".btn");

    if (!$btn) return;

    //비활성된 버튼 막기
    if ($btn.classList.contains("disabled")) return;

    //버튼을 눌렀다!

    onBtnClick($btn.dataset.action);
  });
}

function onBtnClick(type) {
  // 현재 상태를 변경

  for (const btn of $btnSection.children) {
    btn.classList.remove("disabled");
  }

  switch (type) {
    case "play":
      current_status = "playing";

      //play, reset 비활성화

      $play_btn.classList.add("disabled");
      $reset_btn.classList.add("disabled");

      break;

    case "pause":
      current_status = "paused";

      //pause 비활성화

      $pause_btn.classList.add("disabled");
      break;

    case "reset":
      current_status = "idle";
      $reset_btn.classList.add("disabled");
      $pause_btn.classList.add("disabled");
      break;

    default:
      break;
  }

  render();
}

function setLabel() {
  $status_label.innerText = STATUS_LABEL[current_status];
}

function render() {
  setLabel();
  switch (current_status) {
    case "idle":
      //timer을 리셋

      resetTimer();

      break;
    case "playing":
      //timer를 시작
      startTimer();
      break;

    case "paused":
      //timer를 멈춰준다
      pauseTimer();

      break;

    default:
      break;
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      tens++;
      if (tens < 9) $tens.innerText = "0" + tens;
      if (tens > 9) $tens.innerText = tens;

      if (tens > 99) {
        seconds++;
        $seconds.innerText = "0" + seconds;
        $tens.innerText = "00";
        tens = 0;
      }

      if (seconds > 9) $seconds.innerText = seconds;

      if (seconds > 59) {
        minutes++;
        $minutes.innerText = "0" + minutes;
        $seconds.innerText = "00";
        seconds = 0;
      }

      if (minutes >= 60) {
        pauseTimer();
      }
    }, 10);
  }
}

function pauseTimer() {
  console.log("pauseTImer");
  clearTimer();
}

function resetTimer() {
  clearTimer();

  minutes = 0;
  seconds = 0;
  tens = 0;

  $minutes.innerText = "00";
  $seconds.innerText = "00";
  $tens.innerText = "00";
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

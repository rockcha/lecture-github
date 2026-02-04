import { byId, $ } from "./helper.js";

const DURATION = 5; // 다시 우울해지는 데 까지 걸리는 시간

const STATE_MSG = {
  gloomy: "우울한 상태입니다 😭",
  pet: "쓰담쓰담…✋조금 기분이 나아졌어요.",
  sleep: "쿨…🛌zZz 잠들었어요.",
  bake: "따뜻하게 구워지는 중…🔥 윤기가 돌아요.",
  wrap: "포장 완료! 선물할 준비 끝 🎁",
};

const STATES = Object.keys(STATE_MSG); // 오타 방지용
const INITIAL_STATE = "gloomy";

// dom
const $dcc = $(".dcc");
const $actionBar = $(".action-bar");
const $msg = byId("msg");
const $time = byId("time");
const $timer = byId("timer");

// state
let remainingTime = DURATION;
let timerId = null;

init();

function init() {
  setState(INITIAL_STATE);

  $actionBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".action");
    if (!btn) return;

    const action = btn.dataset.action;

    if (!STATES.includes(action)) return;
    setState(action);
  });
}

function setState(next) {
  //gloomy  일때
  if (next === INITIAL_STATE) {
    disableAction(false); //disableAction만들기
    resetTimer(); //일단 빈칸
  } else {
    //gloomy 아닌 다른 상태일 때
    disableAction(true);
    startTimer(); //일단 빈칸
  }

  //공통

  //이미지 변경
  $dcc.dataset.state = next;

  // 텍스트 변경
  $msg.textContent = STATE_MSG[next];
}

function disableAction(disabled) {
  $actionBar.classList.toggle("disabled", disabled);
}

function startTimer() {
  $timer.classList.add("active");
  if (timerId !== null) return;

  timerId = setInterval(() => {
    remainingTime -= 1;

    if (remainingTime <= 0) {
      setState(INITIAL_STATE);
      return;
    }

    $time.textContent = remainingTime;
  }, 1000);
}

function resetTimer() {
  $timer.classList.remove("active");
  remainingTime = DURATION;
  $time.textContent = DURATION;

  if (timerId === null) return;
  clearInterval(timerId);
  timerId = null;
}

import { byId, $, $$ } from "./helper.js";

// 전역변수들
const questions = [
  "이번 경험은 어땠나요?",
  "과정은 만족스러웠나요?",
  "다시 이용하고 싶나요?",
];

let currentStep = 0; // 0, 1, 2
const MIN_STEP = 0; //가능한 최소 단계

const MAX_STEP = questions.length - 1;

const ratings = Array(questions.length).fill(0); // [0,0,0] 별점을 매기면 기록되는 배열

let hoverRating = 0;

//dom

const $question = $(".question");
const $star_container = $(".stars");
const $stars = $$(".stars i");
const $circles = $$(".steps .circle");
const $prev = byId("prev-btn");
const $next = byId("next-btn");
const $indicator = $(".indicator");

init();

function init() {
  //이벤트 바인딩
  // 🔥 이전 버튼

  $prev.addEventListener("click", () => {
    if (currentStep <= MIN_STEP) return;
    currentStep--;
    render();
  });
  // 🔥 다음 버튼
  $next.addEventListener("click", () => {
    if (currentStep >= MAX_STEP) return alert("제출하였습니다!");
    currentStep++;
    render();
  });

  // 🔥 별점 미리보기 hover

  $star_container.addEventListener("mousemove", (e) => {
    const star = e.target.closest("i");

    if (!star) return;
    hoverRating = Number(star.dataset.index);

    updateRatings(hoverRating);
  });
  // 🔥 별점 미리보기 끝남

  $star_container.addEventListener("mouseleave", (e) => {
    hoverRating = 0;
    updateRatings(ratings[currentStep]);
  });

  // 🔥 별점 클릭

  $star_container.addEventListener("click", (e) => {
    const star = e.target.closest("i");

    if (!star) return;

    ratings[currentStep] = Number(star.dataset.index);
    hoverRating = 0;
    render();
  });

  render();
}

function render() {
  // 🔥 진행 상태 업데이트

  updateIndicator();

  $circles.forEach((circle, idx) => {
    circle.classList.toggle("active", idx <= currentStep);
  });

  // 🔥 질문 내용 업데이트

  $question.textContent = questions[currentStep];

  // 🔥 별점 업데이트

  updateRatings(hoverRating || ratings[currentStep]);

  // 🔥 버튼 업데이트

  // 이전버튼
  // 0 단계 빼고 다 활성화

  // 다음버튼
  // rating 이 0 이 아닌경우 활성화

  $prev.disabled = currentStep === 0 ? true : false;

  $next.disabled = false;

  if (ratings[currentStep] === 0) $next.disabled = true;

  //마지막 단계일 경우 제출하기

  $next.innerHTML =
    currentStep === MAX_STEP
      ? `제출하기`
      : ` 다음 <i class="fa-solid fa-angle-right"></i>`;
}

function updateIndicator() {
  let width = "0%";
  switch (currentStep) {
    case 0:
      width = "0%";
      break;
    case 1:
      width = "50%";
      break;
    case 2:
      width = "100%";
      break;
    default:
      break;
  }

  $indicator.style.width = width;
}

//displayRating 3이다 0, 1, 2
function updateRatings(displayRating = ratings[currentStep]) {
  $stars.forEach((star, idx) => {
    star.classList.toggle("active", idx < displayRating);
  });
}

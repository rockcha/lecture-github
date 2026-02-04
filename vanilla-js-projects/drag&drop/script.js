const FOODS = [
  { emoji: "🍲", name: "김치찌개" },
  { emoji: "🍚", name: "비빔밥" },
  { emoji: "🥩", name: "불고기" },
  { emoji: "🌶️", name: "떡볶이" },
  { emoji: "🍗", name: "치킨" },
  { emoji: "🍕", name: "피자" },
  { emoji: "🍔", name: "햄버거" },
  { emoji: "🍣", name: "초밥" },
  { emoji: "🍝", name: "파스타" },
  { emoji: "🍜", name: "라면" },
];

const $draggable_list = document.getElementById("draggable-list");
let draggingLi = null;

init();

function init() {
  if (!$draggable_list) return;
  //리스트 만들기
  createList();

  //드래그 이벤트 등록하기
  addEventListeners();
}

function shuffle(arr) {
  return arr
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((x) => x.v);
}

function createList() {
  $draggable_list.innerHTML = ``;
  //음식 리스트 섞기

  const shuffled = shuffle(FOODS);

  shuffled.forEach((food) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");

    li.innerHTML = `<span class="emoji">${food.emoji}</span>
        <p class="food-name">${food.name}</p>`;

    $draggable_list.appendChild(li);
  });
}

function addEventListeners() {
  //드래그 시작
  $draggable_list.addEventListener("dragstart", (e) => {
    const li = e.target.closest("li");

    if (!li) return;

    //현재 드래깅하고 있는 요소

    draggingLi = li;
    draggingLi.classList.add("dragging");
  });

  //드래그 끝
  $draggable_list.addEventListener("dragend", () => {
    if (!draggingLi) return;

    draggingLi.classList.remove("dragging");
    draggingLi = null;
  });

  //드래그 오버 , 어떤 대상이 겹쳐질 때

  $draggable_list.addEventListener("dragover", (e) => {
    e.preventDefault(); //드롭 발생시키기

    if (!draggingLi) return;

    const targetLi = e.target.closest("li");

    if (!targetLi || targetLi === draggingLi) return;

    // 마우스 좌표 <-> 타겟의 중앙 y좌표

    //마우스가 더 위에 있으면, 위에다가 targetLi 기준, draggingLi를 넣기
    // 마우스 더 아래에 있으면, 아래에다가 targetLi 기준, draggingLi를 넣기

    const rect = targetLi.getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;

    if (e.clientY < midPoint) {
      //위에다 넣기

      if (targetLi.previousElementSibling !== draggingLi) {
        $draggable_list.insertBefore(draggingLi, targetLi);
      }
    } else {
      //아래에다가 넣기

      if (targetLi.nextElementSibling !== draggingLi) {
        $draggable_list.insertBefore(draggingLi, targetLi.nextElementSibling);
      }
    }
  });
}

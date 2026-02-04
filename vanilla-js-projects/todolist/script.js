import { byId } from "./helper.js";

// let todolist = [
//   {
//     id: 1,
//     content: "밥먹기",
//     isDone: false,
//   },
//   {
//     id: 2,
//     content: "밥먹기",
//     isDone: true,
//   },
//   {
//     id: 3,
//     content: "밥먹기",
//     isDone: false,
//   },
// ];
const MAX_LETTERS = 12;
const $todolist = byId("todolist");
const $tabsSection = byId("tabs-section");

const TODO_KEY = "todo-app";

let current_tab = "all";

init();

function init() {
  // 1. form 에 이벤트 달아주기,

  //   const $form = document.getElementById("form");
  const $form = byId("form");
  const $input = byId("input");
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    //  2. 이벤트가 발생했을 때  input값의 유효성을 검사하기
    const inputValue = $input.value.trim();

    // 12글자를 넘지 않기
    if (inputValue.length > MAX_LETTERS) {
      //   alert(`${MAX_LETTERS}글자를 넘으면 안됩니다.`);
      setMsg(`글자 수는 ${MAX_LETTERS}를 넘으면 안됩니다.`, true);
      return;
    }

    //  3.유효하면  입력값을 배열에 push 하기

    const newItem = {
      id: new Date(),
      content: inputValue,
      isDone: false,
    };

    addItemToLocalStorage(newItem);

    //  4. 추가된 후, msg 에 추가되었습니다 라고 띄우기

    setMsg(`${inputValue}가 추가되었습니다!`);
    $input.value = ``;
    render();
  });

  // tabs-section 에 이벤트 달기

  $tabsSection.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tab-btn")) return;

    console.log();

    const new_tab = e.target.dataset.filter;

    //

    if (current_tab === new_tab) return setMsg("동일한 탭입니다", true);

    //탭 변경

    for (const child of $tabsSection.children) {
      child.classList.remove("current");
    }

    e.target.classList.add("current");

    current_tab = new_tab;

    //할일 업데이트

    render();
  });

  // 토글 버튼과 삭제버튼 기능 구현

  $todolist.addEventListener("click", (e) => {
    console.log("이벤트 발생!");

    const $todoItem = e.target.closest(".todo-item");
    const $toggleBtn = e.target.closest(".toggle-btn");
    const $deleteBtn = e.target.closest(".delete-btn");

    if (!$todoItem) return;
    //토글 버튼이 눌렸을 때

    const id = $todoItem.dataset.id;
    const list = getTodolistFromLocalStorage();

    if ($toggleBtn) {
      // 실제 배열만수정해줘도됨. isDone 여부에따라 render에서 class를 지정해줌.

      list.forEach((item) => {
        if (String(item.id) === id) {
          item.isDone = !item.isDone;
        }
      });

      setLocalStorage(list);

      //render를 호출해야함 즉시반영!
      render();
    }
    //삭제 버튼이 눌렸을 때
    if ($deleteBtn) {
      //id가 동일한 칸의 idx를 찾아서 splice(0,1)로 제거

      const idx = list.findIndex((item) => String(item.id) === id);
      //방어 코드
      if (idx === -1) return setMsg("찾을 수 없는 item입니다", true);
      list.splice(idx, 1);

      setLocalStorage(list);
      render();
    }
  });

  //그리기

  render();
}

function setMsg(msg, isError = false) {
  const $msg = byId("msg");

  $msg.innerText = msg;

  // 에러메세지인지 아닌지 구분

  if (isError) {
    $msg.classList.add("error");
  } else {
    $msg.classList.remove("error");
  }
}

function render() {
  let filtered_arr = [];

  switch (current_tab) {
    case "all":
      filtered_arr = getTodolistFromLocalStorage();
      break;

    case "done":
      filtered_arr = getTodolistFromLocalStorage().filter(
        (item) => item.isDone === true
      );
      break;

    case "undone":
      filtered_arr = getTodolistFromLocalStorage().filter(
        (item) => item.isDone !== true
      );

      break;

    default:
      break;
  }

  //map 까지는 배열 .join()=> 문자열
  $todolist.innerHTML = filtered_arr
    .map(
      (item) => `
 <li class="todo-item${item.isDone ? " done" : ""}" data-id="${item.id}">
            <h2>${item.content}</h2>
            <div class="btn-section">
              <button class="toggle-btn">
                ${
                  item.isDone
                    ? '<i class="fa-regular fa-square-check"></i>'
                    : '<i class="fa-regular fa-square"></i>'
                }
              </button>
              <button class="delete-btn">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </li>
`
    )
    .join("");
}

function getTodolistFromLocalStorage() {
  const saved = localStorage.getItem(TODO_KEY);

  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(TODO_KEY);
    return [];
  }
}

// setLocalStorage

function setLocalStorage(list) {
  localStorage.setItem(TODO_KEY, JSON.stringify(list));
}

function addItemToLocalStorage(item) {
  let list = getTodolistFromLocalStorage();

  list.push(item);
  setLocalStorage(list);
}

// 데이트를 저장하는 순간은 입력값을 입력했을 때 뿐 !

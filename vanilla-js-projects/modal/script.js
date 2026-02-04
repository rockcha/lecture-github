//dom 가져오기

const $dlg = document.getElementById("dlg");
const $btn = document.getElementById("download-btn");
const $result = document.getElementById("result-panel");

// 이벤트

addEventListeners();

function addEventListeners() {
  // 다운로드 버튼 -> 모달 열리기

  $btn.addEventListener("click", () => {
    // console.log("clicked!");

    $dlg.showModal();
  });
  //배경을 눌렀을때 모달 닫히기

  $dlg.addEventListener("click", (e) => {
    const rect = $dlg.getBoundingClientRect();

    //클릭한 좌표값이 밖인지?
    // 마우스 좌표 , $dlg 의 꼭지점 좌표들

    const isOuside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOuside) $dlg.close("cancel");
  });

  //모달이 닫힐 때 처리할 이벤트

  $dlg.addEventListener("close", () => {
    const value = $dlg.returnValue;
    const $h3 = $result.querySelector("h3");
    const $p = $result.querySelector("p");

    // 버튼을 눌러서 , 모달을 닫았을 경우, 다운로드 진행

    if (value === "cancel" || !value) {
      $result.classList.remove("completed");
      $h3.textContent = "❌다운로드 오류";
      $p.textContent = "---";
      return;
    }

    //버튼을 눌러서, 유효값이 value에 들어왔다.

    $result.classList.add("completed");
    $h3.textContent = "✅다운로드 완료";
    $p.textContent = `data.${value}`;
  });
}

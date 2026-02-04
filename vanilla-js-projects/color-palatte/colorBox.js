export function createColorBox(color = "#FFC1D1") {
  //DOM 제작

  const boxEl = document.createElement("button");
  boxEl.className = "box";

  const colorEl = document.createElement("div");
  colorEl.className = "color";

  const hexEl = document.createElement("span");
  hexEl.className = "hex";
  hexEl.textContent = color;

  const msgEl = document.createElement("span");
  msgEl.className = "msg";
  msgEl.innerHTML = `복사 완료 <i class="fa-regular fa-circle-check"></i>  `;

  boxEl.append(colorEl, hexEl, msgEl);

  //현재 색상을 가지고 있어야함

  let currentColor = color;

  setColor(currentColor);

  // 클릭 시 hex 코드 복사

  boxEl.addEventListener("click", async () => {
    if (boxEl.classList.contains("copied")) return;
    const ok = await copyToClipboard(hexEl.textContent);
    if (!ok) return;

    // copied 라는 class 붙이기
    boxEl.classList.add("copied");
    setTimeout(() => {
      boxEl.classList.remove("copied");
    }, 1500);
  });

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function setColor(color) {
    if (!color) return;
    currentColor = color;
    hexEl.textContent = color;
    colorEl.style.backgroundColor = color;
  }

  return { boxEl, setColor };
}

// dom 요소들 가져오기

//input

const $username = document.getElementById("username");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $password2 = document.getElementById("password2");

//form
const $form = document.getElementById("form");

init();

function init() {
  if (!$username || !$email || !$password || !$password2) {
    alert("에러!");
    return;
  }

  //form 에 이벤트 달기

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("submit");

    checkInputs();
  });
}

//입력값들을 검증하는 함수
function checkInputs() {
  let isSuccess = true;

  //입력값
  const usernameValue = $username.value.trim();
  const emailValue = $email.value.trim();
  const passwordValue = $password.value.trim();
  const password2Value = $password2.value.trim();

  //입력값 검증

  // 1. 공백 체크

  if (!usernameValue) {
    setFail($username, "필수값입니다");
    isSuccess = false;
  } else {
    setSuccess($username);
  }
  if (!emailValue) {
    setFail($email, "필수값입니다.");
    isSuccess = false;
  } else setSuccess($email);
  if (!passwordValue) {
    setFail($password, "필수값입니다.");
    isSuccess = false;
  } else setSuccess($password);
  if (!password2Value) {
    setFail($password2, "필수값입니다.");
    isSuccess = false;
  } else setSuccess($password2);

  // 2. 이메일 형식 체크

  if (isValidEmail(emailValue)) {
    setSuccess($email);
  } else {
    setFail($email, "이메일 확인해주세요!");
    isSuccess = false;
  }

  // 3. 비밀번호 일치

  if (passwordValue !== password2Value) {
    setFail($password, "비밀번호를 확인해주세요!");
    setFail($password2, "비밀번호를 확인해주세요!");
    isSuccess = false;
  }

  if (isSuccess) {
    alert("회원가입 완료!");
  }
}

function isValidEmail(email) {
  //간단한 이메일 검증
  return /^\S+@\S+\.\S+$/.test(email);
}

function setFail(tar, msg = "알 수 없는 에러") {
  if (!tar) return;

  const formControl = tar.parentElement;

  formControl.classList.remove("success");
  formControl.classList.add("fail");

  const small = formControl.querySelector("small");
  small.textContent = msg;
}

function setSuccess(tar) {
  if (!tar) return;

  const formControl = tar.parentElement;
  formControl.classList.remove("fail");
  formControl.classList.add("success");
}

/*
[페이지가 열릴 때]


쿠키 확인[hideBanner] -> 없다 / 있다


없음 -> 배너 보여주기

있다 -> 배너 숨기기


============
[버튼 이벤트]


확인 버튼  -> 배너를 숨기기

보지 않기 버튼 -> 배너를 숨기기 + 쿠키[hideBanner] 세팅 

*/

import { byId, $ } from "./helper.js";

//dom

const $banner = $(".cookie-banner");
const $confirm_btn = byId("confirm-btn");
const $hide_btn = byId("hide-btn");

//변수

const COOKIE_KEY = "hideBanner";
const MAX_AGE = 20;
// 쿠키 저장될 시간을 나타냄 (초)

init();

function init() {
  //1. 쿠키 존재 여부 확인
  // 존재 -> 배너를 hide
  // 존재 x -> 배너를

  toggleShowBanner(doesCookieExist());

  // 2. 이벤트 달기 ( 버튼 두 개 )

  $confirm_btn.addEventListener("click", () => {
    toggleShowBanner(true);
  });

  $hide_btn.addEventListener("click", () => {
    toggleShowBanner(true);

    // 쿠키 세팅
    document.cookie = `${COOKIE_KEY}=true; max-age=${MAX_AGE}; `;
  });
}

function doesCookieExist() {
  return document.cookie.includes(COOKIE_KEY);
}

function toggleShowBanner(shouldHide) {
  $banner.classList.remove("show");
  if (!shouldHide) $banner.classList.add("show");
}

// index.js
import { byId } from "./helper.js";
import { getWmoMeta } from "./constants.js";

// DOM
const $input = byId("input");
const $inputBtn = byId("input-btn");

const $main = byId("main-screen");
const $loading = byId("loading-screen");
const $notFound = byId("not-found-screen");
const $idle = byId("idle-screen");

const $loc = byId("current-location");
const $date = byId("current-date");
const $weatherText = byId("current-weather");
const $temp = byId("current-temperature");
const $wind = byId("current-wind");

const $hourly = document.querySelector(".hourly-section");
const $currentImg = document.querySelector(".img-section img");

// 화면 전환
function showScreen(which) {
  [$main, $loading, $notFound, $idle].forEach((el) =>
    el.classList.remove("current"),
  );
  which.classList.add("current");
}

// 이벤트
$inputBtn.addEventListener("click", () => {
  const city = $input.value.trim();
  if (!city) return;
  run(city);
});

$input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const city = $input.value.trim();
  if (!city) return;
  run(city);
});

// 메인 실행
async function run(city) {
  showScreen($loading);

  try {
    const loc = await geocodeCity(city);
    const data = await fetchWeather(loc);

    renderCurrent(loc, data);
    renderHourly(data);

    showScreen($main);
  } catch (e) {
    console.log("에러:", e.message);
    showScreen($notFound);
  }
}

// 1) Geocoding
async function geocodeCity(city) {
  const u = new URL("https://geocoding-api.open-meteo.com/v1/search");
  u.searchParams.set("name", city);
  u.searchParams.set("count", "1");
  u.searchParams.set("language", "ko");
  u.searchParams.set("format", "json");

  const res = await fetch(u);
  if (!res.ok) throw new Error(`Geocoding HTTP ${res.status}`);

  const data = await res.json();
  const first = data?.results?.[0];
  if (!first) throw new Error("검색 결과 없음");

  return {
    name: first.name,
    country: first.country,
    latitude: first.latitude,
    longitude: first.longitude,
  };
}

// 2) Weather
async function fetchWeather(loc) {
  const u = new URL("https://api.open-meteo.com/v1/forecast");
  u.searchParams.set("latitude", loc.latitude);
  u.searchParams.set("longitude", loc.longitude);

  // ✅ 현재 + hourly(오늘 24시간 뽑기)
  u.searchParams.set("current", "temperature_2m,wind_speed_10m,weather_code");
  u.searchParams.set("hourly", "temperature_2m,weather_code");

  // 단위/시간대
  u.searchParams.set("temperature_unit", "celsius");
  u.searchParams.set("wind_speed_unit", "ms");
  u.searchParams.set("timezone", "Asia/Seoul");

  const res = await fetch(u);
  if (!res.ok) throw new Error(`Forecast HTTP ${res.status}`);
  return res.json();
}

// 렌더: 현재
function renderCurrent(loc, data) {
  const c = data.current;
  if (!c) return;

  $loc.textContent = `${loc.name}${loc.country ? ", " + loc.country : ""}`;
  $date.textContent = c.time?.slice(0, 10) ?? "";

  $temp.textContent = `${Math.round(c.temperature_2m)}°C`;
  $wind.textContent = `${c.wind_speed_10m} m/s`;

  const meta = getWmoMeta(c.weather_code);
  $weatherText.textContent = meta.text;
  $currentImg.src = meta.path;
  $currentImg.alt = meta.text;
}

// 렌더: 오늘 24시간(hourly)
function renderHourly(data) {
  const h = data.hourly;
  if (!h?.time?.length) return;

  // ✅ 무조건 hourly 기준 날짜로 잡기 (자정/새벽 꼬임 방지)
  const today = h.time[0].slice(0, 10);

  const cards = [];
  for (let i = 0; i < h.time.length; i++) {
    if (!h.time[i].startsWith(today)) continue;

    const hhmm = h.time[i].slice(11, 16);
    const t = Math.round(h.temperature_2m[i]);
    const meta = getWmoMeta(h.weather_code[i]);

    cards.push(`
      <div class="card">
        <span>${hhmm}</span>
        <img src="${meta.path}" alt="${meta.text}" />
        <span>${t}°C</span>
      </div>
    `);
  }

  $hourly.innerHTML = cards.join("");
}

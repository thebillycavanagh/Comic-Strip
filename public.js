import { siteConfig, firebaseConfig } from "./firebase-config.js";

const dayOne = {
  imageUrl: "day-1.png",
  title: "Day 1 — Whispers in the Crystal Valley",
  caption: "Megatheia and Blue follow the crystal whispers.",
  bannerMessage: "Day 1 is here. A new adventure releases daily at 7:19 AM Mountain Time.",
};

document.title = siteConfig.title;
document.getElementById("site-title").textContent = siteConfig.title;
document.getElementById("site-subtitle").textContent = siteConfig.subtitle;

function showComic(comic) {
  document.getElementById("featured").classList.remove("hidden");
  document.getElementById("no-comic").classList.add("hidden");
  document.getElementById("archive-empty").classList.remove("hidden");
  document.getElementById("featured-image").src = comic.imageUrl;
  document.getElementById("featured-image").alt = comic.altText || comic.title;
  document.getElementById("featured-title").textContent = comic.title;
  document.getElementById("featured-caption").textContent = comic.caption || "";
  document.getElementById("featured-date").textContent = "DAY 1";
  document.getElementById("banner").textContent = comic.bannerMessage || siteConfig.fallbackBanner;
}

function nextRelease() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const represented = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  const offset = represented - now.getTime();
  let release = Date.UTC(+p.year, +p.month - 1, +p.day, siteConfig.releaseHour, siteConfig.releaseMinute) - offset;
  if (release <= now.getTime()) release += 86400000;
  return release;
}

let releaseAt = nextRelease();
function tick() {
  if (releaseAt <= Date.now()) releaseAt = nextRelease();
  const remaining = releaseAt - Date.now();
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("countdown").textContent =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

showComic(dayOne);
tick();
setInterval(tick, 1000);

const firebaseReady = !Object.values(firebaseConfig).some((value) => value.includes("PASTE_"));
if (firebaseReady) {
  try {
    const [{ initializeApp }, { getFirestore, collection, getDocs, query, orderBy }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"),
    ]);
    const db = getFirestore(initializeApp(firebaseConfig));
    const snapshot = await getDocs(query(collection(db, "comics"), orderBy("releaseAtMs", "desc")));
    const published = snapshot.docs.map((doc) => doc.data())
      .filter((comic) => comic.releaseAtMs <= Date.now())
      .sort((a, b) => b.releaseAtMs - a.releaseAtMs);
    if (published[0]) showComic(published[0]);
  } catch (error) {
    console.warn("Showing Day 1 while Firebase is unavailable.", error);
  }
}

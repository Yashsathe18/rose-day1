// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change to her name/nickname
const BPM = 78;
// ========================

document.getElementById("herName").textContent = HER_NAME;

const introOverlay = document.getElementById("introOverlay");
const introVideo = document.getElementById("introVideo");
const beginBtn = document.getElementById("beginBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const vidDebug = document.getElementById("vidDebug");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const toPage2 = document.getElementById("toPage2");
const toPage3 = document.getElementById("toPage3");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");
const bouquetVideo = document.getElementById("bouquetVideo");
const bouquetFallback = document.getElementById("bouquetFallback");
const whisper = document.getElementById("whisper");

function setDebug(msg){ if (vidDebug) vidDebug.textContent = msg; }

// Intro video debug
window.addEventListener("load", async () => {
  setDebug("intro: loading… " + introVideo.currentSrc);

  introVideo.addEventListener("loadedmetadata", () =>
    setDebug(`intro: metadata ✅ (${introVideo.videoWidth}x${introVideo.videoHeight})`)
  );
  introVideo.addEventListener("playing", () => setDebug("intro: playing ✅"));
  introVideo.addEventListener("error", () => {
    const code = introVideo.error?.code; // 2=network 3=decode 4=src
    setDebug("intro: ERROR ❌ code=" + code + " (2=network,3=decode,4=src)");
  });

  // Try muted autoplay
  try {
    introVideo.muted = true;
    await introVideo.play();
  } catch (e) {
    setDebug("intro: autoplay blocked (tap Begin) ❗");
  }
});

// Beat pulse
function startBeatPulse(){
  const intervalMs = Math.round((60 / BPM) * 1000);
  const beatEls = document.querySelectorAll(".beat");
  setInterval(() => {
    beatEls.forEach(el => {
      el.classList.remove("pulse");
      void el.offsetWidth;
      el.classList.add("pulse");
    });
  }, intervalMs);
}

// Music fade-in
async function playMusicCinematic(){
  try {
    music.volume = 0;
    await music.play();
    let v = 0;
    const target = 0.65;
    const fade = setInterval(() => {
      v += 0.02;
      music.volume = Math.min(v, target);
      if (v >= target) clearInterval(fade);
    }, 120);
  } catch(e) {}
}

// Page switcher
function showPage(n){
  [page1, page2, page3].forEach(p => p.classList.remove("active"));
  if (n === 1) page1.classList.add("active");
  if (n === 2) page2.classList.add("active");
  if (n === 3) page3.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Begin
beginBtn.addEventListener("click", async () => {
  try { introVideo.muted = true; await introVideo.play(); } catch(e) {}
  await playMusicCinematic();
  startBeatPulse();

  introOverlay.classList.add("fade-out");
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.classList.remove("hidden");
    showPage(1);
  }, 900);
});

// Next buttons (NO rushing)
toPage2.addEventListener("click", () => showPage(2));

surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");

  // Attempt bouquet video
  if (bouquetVideo) {
    bouquetVideo.addEventListener("error", () => {
      if (bouquetFallback) bouquetFallback.classList.remove("hidden");
    }, { once: true });

    try {
      bouquetVideo.muted = true;
      bouquetVideo.currentTime = 0;
      bouquetVideo.play().catch(() => {
        if (bouquetFallback) bouquetFallback.classList.remove("hidden");
      });
    } catch(e) {
      if (bouquetFallback) bouquetFallback.classList.remove("hidden");
    }
  }
});

toPage3.addEventListener("click", () => {
  showPage(3);
  setTimeout(() => whisper.classList.add("show"), 900);
});

// Petals
for (let i = 0; i < 18; i++) {
  const petal = document.createElement("img");
  petal.src = "./assets/petal.png";
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.top = (-10 - Math.random() * 40) + "vh";
  petal.style.width = (16 + Math.random() * 22) + "px";
  petal.style.opacity = (0.25 + Math.random() * 0.55);
  petal.style.animationDuration = (9 + Math.random() * 6) + "s";
  petal.style.animationDelay = (Math.random() * 3) + "s";
  document.body.appendChild(petal);
}
const petalStyle = document.createElement("style");
petalStyle.innerHTML = `
.petal{position:fixed;z-index:-1;pointer-events:none;animation:fall linear infinite}
@keyframes fall{to{transform:translateY(140vh) rotate(360deg)}}
`;
document.head.appendChild(petalStyle);

// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change to her name/nickname
const BPM = 78;
// ========================

document.getElementById("herName").textContent = HER_NAME;

const introOverlay = document.getElementById("introOverlay");
const introVideo   = document.getElementById("introVideo");
const beginBtn     = document.getElementById("beginBtn");
const mainContent  = document.getElementById("mainContent");
const music        = document.getElementById("bgMusic");
const vidDebug     = document.getElementById("vidDebug");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const toPage2 = document.getElementById("toPage2");
const toPage3 = document.getElementById("toPage3");

const surpriseBtn     = document.getElementById("surpriseBtn");
const surpriseBox     = document.getElementById("surpriseBox");
const bouquetVideo    = document.getElementById("bouquetVideo");
const bouquetFallback = document.getElementById("bouquetFallback");
const whisper         = document.getElementById("whisper");

function setDebug(msg){ if (vidDebug) vidDebug.textContent = msg; }

// Show exact error code if video fails
introVideo.addEventListener("error", () => {
  const code = introVideo.error?.code;
  // 1=ABORTED 2=NETWORK 3=DECODE 4=SRC_NOT_SUPPORTED
  setDebug("intro: ERROR ❌ code=" + code + " (2=network,3=decode,4=src)");
});
introVideo.addEventListener("loadedmetadata", () => {
  setDebug(`intro: ready ✅ (${introVideo.videoWidth}x${introVideo.videoHeight}) — tap Begin`);
});

// IMPORTANT: We do NOT call introVideo.play() on load.
// That avoids the “autoplay blocked” message entirely.
setDebug("intro: tap Begin to start");

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

// Page switcher (no rushing)
function showPage(n){
  [page1, page2, page3].forEach(p => p.classList.remove("active"));
  if (n === 1) page1.classList.add("active");
  if (n === 2) page2.classList.add("active");
  if (n === 3) page3.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Start experience ONLY after user tap/click
let started = false;
async function startExperience(){
  if (started) return;
  started = true;

  // Start intro video after gesture
  try {
    introVideo.muted = true;
    introVideo.currentTime = 0;
    await introVideo.play();
    setDebug("intro: playing ✅");
  } catch(e) {
    // If it fails, the error listener above will show the code
    setDebug("intro: could not play (check error code)");
  }

  await playMusicCinematic();
  startBeatPulse();

  introOverlay.classList.add("fade-out");
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.classList.remove("hidden");
    showPage(1);
  }, 900);
}

// Begin button starts it
beginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startExperience();
});

// Also allow tapping anywhere on intro overlay
introOverlay.addEventListener("click", (e) => {
  // avoid double triggering if button was clicked
  if (e.target && e.target.id === "beginBtn") return;
  startExperience();
});

// Next buttons
toPage2.addEventListener("click", () => showPage(2));

surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");

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

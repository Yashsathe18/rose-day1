// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change this
const BPM = 78;
// ========================

document.getElementById("herName").textContent = HER_NAME;

const introOverlay = document.getElementById("introOverlay");
const introVideo   = document.getElementById("introVideo");
const beginBtn     = document.getElementById("beginBtn");
const tapHint      = document.getElementById("tapHint");

const mainContent  = document.getElementById("mainContent");
const music        = document.getElementById("bgMusic");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const toPage2      = document.getElementById("toPage2");
const toPage3      = document.getElementById("toPage3");

const surpriseBtn  = document.getElementById("surpriseBtn");
const surpriseBox  = document.getElementById("surpriseBox");
const bouquetVideo = document.getElementById("bouquetVideo");

const whisper      = document.getElementById("whisper");

// ---- Autoplay intro video (muted) ----
window.addEventListener("load", () => {
  introVideo.muted = true;
  introVideo.loop = true;
  introVideo.playsInline = true;

  introVideo.play().catch(() => {
    // If blocked, it will still play after user taps Begin
  });

  // After metadata, sharpen the blur gradually
  introVideo.addEventListener("loadeddata", () => {
    introVideo.classList.add("intro-sharp");
  }, { once: true });
});

// ---- Start music on FIRST interaction anywhere ----
let musicStarted = false;
function startMusicOnce(){
  if (musicStarted) return;
  musicStarted = true;

  if (tapHint) tapHint.textContent = "music is playing… 🎧";

  music.volume = 0;
  music.play().then(() => {
    let v = 0;
    const target = 0.65;
    const fade = setInterval(() => {
      v += 0.02;
      music.volume = Math.min(v, target);
      if (v >= target) clearInterval(fade);
    }, 120);
  }).catch(()=>{});
}
document.addEventListener("click", startMusicOnce, { once:true });
document.addEventListener("touchstart", startMusicOnce, { once:true });

// ---- Beat pulse ----
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
startBeatPulse();

// ---- Pages ----
function showPage(n){
  [page1, page2, page3].forEach(p => p.classList.remove("active"));
  if (n === 1) page1.classList.add("active");
  if (n === 2) page2.classList.add("active");
  if (n === 3) page3.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Begin (fade into main, no rushing)
beginBtn.addEventListener("click", () => {
  introOverlay.classList.add("fade-out");
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.classList.remove("hidden");
    showPage(1);
  }, 900);
});

toPage2.addEventListener("click", () => showPage(2));

surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");
  // Play bouquet video on reveal
  if (bouquetVideo) {
    bouquetVideo.muted = true;
    bouquetVideo.currentTime = 0;
    bouquetVideo.play().catch(()=>{});
  }
});

toPage3.addEventListener("click", () => {
  showPage(3);
  setTimeout(() => whisper.classList.add("show"), 900);
});

// ---- Petals ----
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

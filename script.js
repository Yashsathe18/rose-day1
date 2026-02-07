// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change name here
const BPM = 78;

// Timings (tweak if you want)
const INTRO_SECONDS = 6.5;       // how long intro video shows before switching
const PAGE1_SECONDS  = 8.0;      // how long the text page shows before going to reveal page
const BOUQUET_SECONDS = 10.0;    // how long bouquet plays before final page
// ========================

document.getElementById("herName").textContent = HER_NAME;

const introOverlay = document.getElementById("introOverlay");
const introVideo   = document.getElementById("introVideo");
const tapHint      = document.getElementById("tapHint");
const mainContent  = document.getElementById("mainContent");
const music        = document.getElementById("bgMusic");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const surpriseBtn  = document.getElementById("surpriseBtn");
const surpriseBox  = document.getElementById("surpriseBox");
const bouquetVideo = document.getElementById("bouquetVideo");
const whisper      = document.getElementById("whisper");

function showPage(n){
  [page1, page2, page3].forEach(p => p.classList.remove("active"));
  if (n === 1) page1.classList.add("active");
  if (n === 2) page2.classList.add("active");
  if (n === 3) page3.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Autoplay intro video (muted)
window.addEventListener("load", () => {
  introVideo.muted = true;
  introVideo.loop = true;
  introVideo.playsInline = true;

  introVideo.play().catch(()=>{});

  // blur -> sharp once it loads
  introVideo.addEventListener("loadeddata", () => {
    introVideo.classList.add("intro-sharp");
  }, { once:true });

  // After intro duration, fade overlay out and go to Page 1
  setTimeout(() => {
    introOverlay.classList.add("fade-out");
    setTimeout(() => {
      introOverlay.style.display = "none";
      mainContent.classList.remove("hidden");
      showPage(1);
      startCueTimeline();
      // Auto go to Page 2 after Page 1 duration
      setTimeout(() => showPage(2), PAGE1_SECONDS * 1000);
    }, 900);
  }, INTRO_SECONDS * 1000);
});

// Start music on first interaction anywhere
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
startBeatPulse();

// Text cue timing (like your original)
function startCueTimeline(){
  const cues = document.querySelectorAll(".cue[data-cue]");
  const schedule = [
    { t: 0.8, i: 0 },
    { t: 2.4, i: 1 },
    { t: 4.0, i: 2 },
    { t: 5.2, i: 3 },
  ];
  schedule.forEach(s => setTimeout(() => cues[s.i]?.classList.add("show"), s.t * 1000));
}

// Tap Reveal -> show bouquet and autoplay it, then auto final
surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");

  if (bouquetVideo) {
    bouquetVideo.muted = true;
    bouquetVideo.loop = false;          // let it play once for the moment
    bouquetVideo.currentTime = 0;
    bouquetVideo.play().catch(()=>{});
  }

  // After bouquet seconds -> final page
  setTimeout(() => {
    showPage(3);
    setTimeout(() => whisper.classList.add("show"), 900);
  }, BOUQUET_SECONDS * 1000);
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

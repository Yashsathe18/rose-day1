// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change this
const BPM = 78;
// ========================

document.getElementById("herName").textContent = HER_NAME;

const introOverlay = document.getElementById("introOverlay");
const introVideo   = document.getElementById("introVideo");
const introContent = document.getElementById("introContent");

const beginBtn     = document.getElementById("beginBtn");
const mainContent  = document.getElementById("mainContent");
const music        = document.getElementById("bgMusic");

const continueBtn  = document.getElementById("continueBtn");
const surpriseBtn  = document.getElementById("surpriseBtn");
const surpriseBox  = document.getElementById("surpriseBox");
const bouquetVideo = document.getElementById("bouquetVideo");
const whisper      = document.getElementById("whisper");

// Autoplay intro video (muted) immediately
window.addEventListener("load", () => {
  introVideo.muted = true;
  introVideo.loop = true;
  introVideo.playsInline = true;
  introVideo.play().catch(()=>{});

  // Show Begin UI after the trailer card animation finishes (~3.2s)
  setTimeout(() => {
    introContent.classList.add("show");
  }, 3200);
});

// Music starts after tap (policy-safe)
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

// Beat pulse engine
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

// Cue timeline (like original)
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

// Begin
beginBtn.addEventListener("click", async () => {
  await playMusicCinematic();
  startBeatPulse();

  introOverlay.classList.add("fade-out");
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    startCueTimeline();
  }, 900);
});

// Continue scrolls to bouquet section
continueBtn.addEventListener("click", () => {
  document.getElementById("bouquetSection").scrollIntoView({ behavior: "smooth" });
});

// Reveal surprise: show + autoplay bouquet
surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");

  if (bouquetVideo) {
    bouquetVideo.muted = true;
    bouquetVideo.currentTime = 0;
    bouquetVideo.play().catch(()=>{});
  }

  // show whisper when they scroll to final (no forced scroll)
  setTimeout(() => whisper.classList.add("show"), 2400);
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

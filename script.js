// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // <-- put her name here (example: "Ananya")
const BPM = 78;               // dramatic tempo (try 72–90)
// ========================

document.getElementById("herName").textContent = HER_NAME;

// Floating petals (subtle)
for (let i = 0; i < 18; i++) {
  const petal = document.createElement("img");
  petal.src = "assets/petal.png";
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
.petal{
  position:fixed;
  z-index:-1;
  pointer-events:none;
  animation-name:fall;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
}
@keyframes fall{
  to{
    transform: translateY(140vh) rotate(360deg);
  }
}`;
document.head.appendChild(petalStyle);

// Elements
const introOverlay = document.getElementById("introOverlay");
const introVideo = document.getElementById("introVideo");
const beginBtn = document.getElementById("beginBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");

const continueBtn = document.getElementById("continueBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");
const bouquetVideo = document.querySelector(".bouquet-video");
const whisper = document.getElementById("whisper");

// Beat pulse engine
let beatTimer = null;
function startBeatPulse(){
  const intervalMs = Math.round((60 / BPM) * 1000);
  const beatEls = document.querySelectorAll(".beat");
  beatTimer = setInterval(() => {
    beatEls.forEach(el => {
      el.classList.remove("pulse");
      void el.offsetWidth; // reflow
      el.classList.add("pulse");
    });
  }, intervalMs);
}

// Cue timeline (tweak times if you want tighter sync to your song)
function startCueTimeline(){
  const cues = document.querySelectorAll(".cue[data-cue]");
  const schedule = [
    { t: 0.8, i: 0 },
    { t: 2.4, i: 1 },
    { t: 4.0, i: 2 },
    { t: 5.2, i: 3 },
  ];
  schedule.forEach(s => {
    setTimeout(() => cues[s.i]?.classList.add("show"), s.t * 1000);
  });
}

// Music cinematic fade-in
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

// Begin
beginBtn.addEventListener("click", async () => {
  try {
    introVideo.muted = false;
    await introVideo.play();
  } catch(e) {}

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

// Continue scroll
continueBtn.addEventListener("click", () => {
  document.querySelector(".video-section").scrollIntoView({ behavior: "smooth" });
});

// Surprise reveal
surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");
  popConfetti();

  // Restart bouquet video for dramatic reveal
  if (bouquetVideo) {
    try {
      bouquetVideo.currentTime = 0;
      bouquetVideo.play().catch(()=>{});
    } catch(e) {}
  }

  setTimeout(() => {
    document.getElementById("finalSection").scrollIntoView({ behavior: "smooth" });
  }, 900);

  setTimeout(() => {
    whisper.classList.add("show");
  }, 2400);
});

// Confetti
function popConfetti(){
  for(let i=0;i<70;i++){
    const c = document.createElement("div");
    c.className="conf";
    c.style.left = Math.random()*100+"vw";
    c.style.top = (40 + Math.random()*15)+"vh";
    c.style.width = (6 + Math.random()*6)+"px";
    c.style.height = (10 + Math.random()*12)+"px";
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    c.style.opacity = 0.9;
    c.style.animationDuration = (1.6 + Math.random()*1.2)+"s";
    const hue = Math.floor(Math.random()*360);
    c.style.background = `hsl(${hue}, 70%, 75%)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 2500);
  }
}
const confStyle = document.createElement("style");
confStyle.innerHTML = `
.conf{
  position:fixed;
  z-index:6;
  border-radius:4px;
  animation: confFall linear forwards;
}
@keyframes confFall{
  to{
    transform: translateY(80vh) rotate(720deg);
    opacity:0;
  }
}`;
document.head.appendChild(confStyle);

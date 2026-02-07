// ====== EDIT THESE ======
const HER_NAME = "Baby Girl"; // change this
const BPM = 78;
// ========================

window.addEventListener("load", () => {
  // Grab elements safely
  const introOverlay = document.getElementById("introOverlay");
  const introVideo   = document.getElementById("introVideo");
  const introContent = document.getElementById("introContent");
  const trailerCard  = document.getElementById("trailerCard");

  const beginBtn     = document.getElementById("beginBtn");
  const mainContent  = document.getElementById("mainContent");
  const music        = document.getElementById("bgMusic");

  const continueBtn  = document.getElementById("continueBtn");
  const surpriseBtn  = document.getElementById("surpriseBtn");
  const surpriseBox  = document.getElementById("surpriseBox");
  const bouquetVideo = document.getElementById("bouquetVideo");
  const whisper      = document.getElementById("whisper");

  const herNameEl = document.getElementById("herName");
  if (herNameEl) herNameEl.textContent = HER_NAME;

  // ---------- Autoplay intro video (muted) ----------
  if (introVideo) {
    introVideo.muted = true;
    introVideo.loop = true;
    introVideo.playsInline = true;
    introVideo.play().catch(() => {
      // If autoplay is blocked, it will still show the video poster/first frame.
      // Begin button still works.
    });
  }

  // ---------- Show Begin UI after trailer animation ends ----------
  // Preferred: listen for animation end of trailerCard
  if (trailerCard && introContent) {
    // If animationend never fires (rare), fallback after 3.5s
    const fallback = setTimeout(() => introContent.classList.add("show"), 3500);

    trailerCard.addEventListener("animationend", (e) => {
      // Trailer has 2 animations: trailerIn + trailerOut.
      // We show Begin after trailerOut completes.
      if (e.animationName === "trailerOut") {
        clearTimeout(fallback);
        introContent.classList.add("show");
      }
    });
  } else if (introContent) {
    // If trailerCard missing, just show begin UI immediately
    introContent.classList.add("show");
  }

  // ---------- Beat pulse ----------
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

  // ---------- Cue timeline (like original) ----------
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

  // ---------- Music starts after tap ----------
  async function playMusicCinematic(){
    if (!music) return;
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

  // ---------- Begin ----------
  if (beginBtn) {
    beginBtn.addEventListener("click", async () => {
      await playMusicCinematic();
      startBeatPulse();

      if (introOverlay) introOverlay.classList.add("fade-out");

      setTimeout(() => {
        if (introOverlay) introOverlay.style.display = "none";
        if (mainContent) mainContent.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        startCueTimeline();
      }, 900);
    });
  }

  // ---------- Continue scroll ----------
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      document.getElementById("bouquetSection")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ---------- Reveal bouquet + autoplay ----------
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      if (surpriseBox) surpriseBox.classList.remove("hidden");

      if (bouquetVideo) {
        bouquetVideo.muted = true;
        bouquetVideo.loop = true;
        bouquetVideo.currentTime = 0;
        bouquetVideo.play().catch(()=>{});
      }

      // Whisper appears (no forced scroll)
      if (whisper) setTimeout(() => whisper.classList.add("show"), 2400);
    });
  }

  // ---------- Petals ----------
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
});

// Floating petals (optional, looks nice)
for (let i = 0; i < 22; i++) {
  const petal = document.createElement("img");
  petal.src = "assets/petal.png";
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.top = (-10 - Math.random() * 40) + "vh";
  petal.style.width = (16 + Math.random() * 22) + "px";
  petal.style.opacity = (0.3 + Math.random() * 0.6);
  petal.style.animationDuration = (8 + Math.random() * 6) + "s";
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

// Intro flow
const introOverlay = document.getElementById("introOverlay");
const introVideo = document.getElementById("introVideo");
const beginBtn = document.getElementById("beginBtn");
const mainContent = document.getElementById("mainContent");

beginBtn.addEventListener("click", async () => {
  // Attempt to unmute after user gesture (works on many browsers)
  try {
    introVideo.muted = false; // If it fails, it will just stay muted
    await introVideo.play();
  } catch (e) {}

  introOverlay.classList.add("fade-out");
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 700);
});

// Smooth continue button
document.getElementById("scrollBtn").addEventListener("click", () => {
  document.querySelector(".video-section").scrollIntoView({ behavior: "smooth" });
});

// Surprise reveal
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");

surpriseBtn.addEventListener("click", () => {
  surpriseBox.classList.remove("hidden");
  popConfetti();
  setTimeout(() => {
    document.getElementById("finalSection").scrollIntoView({ behavior: "smooth" });
  }, 800);
});

// Fade out animation class for intro
const fadeStyle = document.createElement("style");
fadeStyle.innerHTML = `
.fade-out{
  animation: fadeOut .7s ease forwards;
}
@keyframes fadeOut{
  to{ opacity:0; transform:scale(1.02); }
}`;
document.head.appendChild(fadeStyle);

// Lightweight confetti (no libraries)
function popConfetti(){
  for(let i=0;i<80;i++){
    const c = document.createElement("div");
    c.className="conf";
    c.style.left = Math.random()*100+"vw";
    c.style.top = (40 + Math.random()*20)+"vh";
    c.style.width = (6 + Math.random()*6)+"px";
    c.style.height = (10 + Math.random()*10)+"px";
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    c.style.opacity = 0.9;
    c.style.animationDuration = (1.6 + Math.random()*1.2)+"s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 2500);
  }
}

const confStyle = document.createElement("style");
confStyle.innerHTML = `
.conf{
  position:fixed;
  z-index:5;
  border-radius:4px;
  background: currentColor;
  color: hsl(${Math.floor(Math.random()*360)}, 70%, 70%);
  animation: confFall linear forwards;
}
@keyframes confFall{
  to{
    transform: translateY(80vh) rotate(720deg);
    opacity:0;
  }
}`;
document.head.appendChild(confStyle);

const target = new Date("2026-11-15T19:00:00+02:00").getTime();

function updateCountdown() {
  const diff = target - Date.now();

  const values = {
    days: Math.max(0, Math.floor(diff / 86400000)),
    hours: Math.max(0, Math.floor(diff / 3600000) % 24),
    minutes: Math.max(0, Math.floor(diff / 60000) % 60),
    seconds: Math.max(0, Math.floor(diff / 1000) % 60)
  };

  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent =
      String(value).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("enterBtn").addEventListener("click", () => {
  document.querySelector(".details").scrollIntoView({
    behavior: "smooth"
  });

  const audio = document.getElementById("music");
  audio.play().catch(() => {});
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const music = document.getElementById("music");
const control = document.getElementById("musicControl");

let playing = false;

control.addEventListener("click", () => {
  if (playing) {
    music.pause();
    control.textContent = "♪";
    control.title = "Play music";
  } else {
    music.play().catch(() => {});
    control.textContent = "Ⅱ";
    control.title = "Pause music";
  }

  playing = !playing;
});

music.addEventListener("play", () => {
  playing = true;
  control.textContent = "Ⅱ";
});

music.addEventListener("pause", () => {
  playing = false;
  control.textContent = "♪";
});

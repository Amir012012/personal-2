// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;
const circle = document.getElementById("circle");
const text = document.getElementById("text");

// Circle styles
Object.assign(circle.style, {
  width: "50px",
  height: "50px",
  backgroundColor: "#3498db",
  borderRadius: "30%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  transition: "all 0.5s ease",
  cursor: "pointer",
  margin: "50px auto",
});

// Text styles
Object.assign(text.style, {
  color: "white",
  fontFamily: "'EL Messiri', sans-serif",
  fontSize: "16px",
  textAlign: "center",
  padding: "0 20px",
  opacity: "0",
  transition: "opacity 0.5s ease",
});

// Circle hover effects
circle.addEventListener("mouseover", () => {
  circle.style.width = "620px";
  circle.style.borderRadius = "50px";
  text.style.opacity = "1";
});

circle.addEventListener("mouseout", () => {
  circle.style.width = "50px";
  circle.style.borderRadius = "50%";
  text.style.opacity = "0";
});

// Theme toggle click event
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌓";

  // Save theme preference
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.textContent = "☰";
  });
});

// Scroll animation
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

// Particles.js setup
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#3498db",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#3498db",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

// Piano
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckBox = document.querySelector(".keys-checkbox input");

let allkeys = [],
    audio = new Audio("a.wav");

const playTune = (key) => {
  audio.src = `${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key='${key}']`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  allkeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = (e) => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
  if (allkeys.includes(e.key)) playTune(e.key);
};

keysCheckBox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

const header = document.getElementById("site-header");
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("main-nav");
const languageToggle = document.getElementById("language-toggle");
const rotatorLines = [...document.querySelectorAll(".rotator-line")];

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  });
});

document.addEventListener("click", (event) => {
  if (
    nav.classList.contains("open") &&
    !nav.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

let currentLanguage = localStorage.getItem("siteLanguage") || "en";

function applyLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-en][data-ja]").forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageToggle.textContent = language === "en" ? "日本語" : "English";
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "日本語に切り替える" : "Switch to English"
  );

  localStorage.setItem("siteLanguage", language);
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ja" : "en";
  applyLanguage(currentLanguage);
});

let rotatorIndex = 0;

function showRotatorLine(index) {
  rotatorLines.forEach((line, lineIndex) => {
    line.classList.toggle("active", lineIndex === index);
  });
}

showRotatorLine(rotatorIndex);

window.setInterval(() => {
  rotatorIndex = (rotatorIndex + 1) % rotatorLines.length;
  showRotatorLine(rotatorIndex);
}, 2600);

applyLanguage(currentLanguage);
document.getElementById("year").textContent = new Date().getFullYear();

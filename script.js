// Cache shared DOM nodes once so repeated interactions stay efficient and easy to read.
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const hero = document.querySelector(".hero");
const prevButton = document.querySelector(".hero__arrow--prev");
const nextButton = document.querySelector(".hero__arrow--next");
const backToTopButton = document.querySelector(".floating-tools__top");

// Slide content stays centralized here, which keeps rendering logic clean.
const heroScenes = [
  {
    badge: "GET A CASH OFFER",
    title: "Sell Your House <span class=\"hero__title-accent\">Fast</span> In Memphis, TN?",
    subtitle: "Receive a guaranteed <span class=\"hero__subtitle-accent\">cash offer</span> with no pressure, no hidden costs, and no hassle."
  }
];

// Cache text targets once instead of querying the DOM on every render.
const heroContent = {
  badge: document.querySelector(".hero__badge"),
  title: document.querySelector(".hero__title"),
  subtitle: document.querySelector(".hero__subtitle")
};

let currentScene = 0;

// Render the active scene and guard against missing nodes for safer production behavior.
function renderScene(index) {
  if (!hero || !heroContent.badge || !heroContent.title || !heroContent.subtitle) {
    return;
  }

  const scene = heroScenes[index];

  if (!scene) {
    return;
  }

  hero.dataset.sceneIndex = String(index);
  heroContent.badge.textContent = scene.badge;
  heroContent.title.innerHTML = scene.title;
  heroContent.subtitle.innerHTML = scene.subtitle;
}

// Rotate through scenes safely so additional slides can be added later without rewrites.
function changeScene(direction) {
  currentScene = (currentScene + direction + heroScenes.length) % heroScenes.length;
  renderScene(currentScene);
}

// Toggle the mobile menu while keeping accessibility state synchronized.
function toggleMenu() {
  if (!menuToggle) {
    return;
  }

  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

// Close the menu after navigation selection so mobile interaction feels complete.
function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", toggleMenu);

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

prevButton?.addEventListener("click", () => changeScene(-1));
nextButton?.addEventListener("click", () => changeScene(1));
backToTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Initialize the hero content after all listeners are connected.
renderScene(currentScene);

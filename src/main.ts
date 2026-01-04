import "./css/styles.css";
import logoPath from "./assets/BoviaN-logo.png";
import { homePage } from "./pages/home";
import { aboutPage } from "./pages/about";
import { servicesPage, initServicesEvents } from "./pages/services";
import { contactPage, initContactEvents } from "./pages/contact";

const app = document.getElementById("app") as HTMLElement;
if (!app) throw new Error("Елемент #app не знайдено");

async function render(): Promise<void> {
  const hash = window.location.hash || "#home";

  switch (hash) {
    case "#about":
      app.innerHTML = await aboutPage();
      break;

    case "#services":
      app.innerHTML = await servicesPage();
      initServicesEvents();
      break;

    case "#contact":
      app.innerHTML = await contactPage();
      initContactEvents();
      break;

    default:
      app.innerHTML = await homePage();
  }
}

const burgerBtn = document.querySelector(".burger") as HTMLButtonElement;
const nav = document.querySelector(".nav") as HTMLElement;

if (burgerBtn && nav) {
  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target as Node) &&
      !burgerBtn.contains(e.target as Node)
    ) {
      nav.classList.remove("active");
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("active"));
  });
}

function initLogo(): void {
  const logoDiv = document.querySelector(".logo");
  if (!logoDiv) return;

  const logoImg = document.createElement("img");
  logoImg.src = logoPath;
  logoImg.alt = "BoviaN Logo";
  logoImg.style.height = "50px";
  logoImg.style.width = "auto";
  logoImg.style.maxWidth = "160px";
  logoDiv.appendChild(logoImg);
}

window.addEventListener("DOMContentLoaded", async () => {
  initLogo();
  await render();
});

window.addEventListener("hashchange", async () => {
  await render();
});

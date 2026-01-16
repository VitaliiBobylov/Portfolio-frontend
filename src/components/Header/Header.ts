// src/components/Header.ts
import logoPath from "../../assets/BoviaN-logo.png";
import { isAuthenticated, removeToken } from "../../auth/auth";
import { createAuthModal } from "../AuthModal/AuthModal";
import "./Header.css";

export function createHeader(): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";

  header.innerHTML = `
    <div class="container header-container">
      <div class="logo"></div>

      <button class="burger">☰</button>

      <nav class="nav">
        <a href="#home" data-protected>Головна</a>
        <a href="#about" data-protected>Про мене</a>
        <a href="#services" data-protected>Проєкти</a>
        <a href="#contact" data-protected>Контакти</a>

        <button id="loginBtn" class="btn-login">Вхід</button>
        <button id="logoutBtn" class="btn-logout hidden">Вихід</button>
      </nav>
    </div>
  `;

  // Логотип
  const logoDiv = header.querySelector(".logo") as HTMLElement;
  const logoImg = document.createElement("img");
  logoImg.src = logoPath;
  logoImg.alt = "BoviaN";
  logoImg.style.height = "46px";
  logoDiv.appendChild(logoImg);

  // Елементи
  const nav = header.querySelector(".nav") as HTMLElement;
  const burger = header.querySelector(".burger") as HTMLElement;
  const loginBtn = header.querySelector("#loginBtn") as HTMLButtonElement;
  const logoutBtn = header.querySelector("#logoutBtn") as HTMLButtonElement;
  const protectedLinks = nav.querySelectorAll("[data-protected]");

  // Модалка (створюється один раз)
  const authModal = createAuthModal(() => {
    updateAuthUI();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  document.body.appendChild(authModal);

  // Бургер-меню
  burger.onclick = () => nav.classList.toggle("active");

  // Оновлення UI авторизації
  function updateAuthUI() {
    const auth = isAuthenticated();

    protectedLinks.forEach(link => {
      (link as HTMLElement).style.display = auth ? "inline-block" : "none";
    });

    loginBtn.style.display = auth ? "none" : "inline-block";
    logoutBtn.style.display = auth ? "inline-block" : "none";
  }

  updateAuthUI();

  // Події
  loginBtn.onclick = () => {
    authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // блокуємо скрол під модалкою
  };

  logoutBtn.onclick = () => {
    removeToken();
    updateAuthUI();
    window.location.hash = "#home";
  };

  // Закриття модалки при кліку поза нею або Escape вже є в createAuthModal

  return header;
}
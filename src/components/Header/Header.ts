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
  const loginBtn = header.querySelector("#loginBtn") as HTMLButtonElement | null;
  const logoutBtn = header.querySelector("#logoutBtn") as HTMLButtonElement | null;
  const protectedLinks = nav.querySelectorAll("[data-protected]");

  // Модалка
  const authModal = createAuthModal(() => {
    updateAuthUI();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  document.body.appendChild(authModal);

  // Бургер
  burger.onclick = () => nav.classList.toggle("active");

  // Оновлення UI
  function updateAuthUI() {
    const auth = isAuthenticated();

    protectedLinks.forEach(link => {
      (link as HTMLElement).style.display = auth ? "inline-block" : "none";
    });

    if (loginBtn) loginBtn.style.display = auth ? "none" : "inline-block";
    if (logoutBtn) logoutBtn.style.display = auth ? "inline-block" : "none";
  }

  updateAuthUI();

  // Події
  if (loginBtn) {
    loginBtn.onclick = () => {
      authModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      removeToken();                        // видаляємо токен + user (якщо є)

      updateAuthUI();                       // оновлюємо хедер

      // Переходимо на головну та перерендерюємо контент
      window.location.hash = "#home";
      window.dispatchEvent(new HashChangeEvent("hashchange"));

      // Опціонально: повне перезавантаження сторінки (найнадійніше для очищення стану)
      // window.location.reload();
    };
  }

  return header;
}
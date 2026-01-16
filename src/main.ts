// src/main.ts

// Імпортуємо стилі
import "./css/styles.css";

// Імпортуємо функції рендеру
import { renderLayout } from "./components/Layout";
import { resolveRoute } from "./app/router";

// Отримуємо головний елемент з DOM

const headerRoot: HTMLElement = document.getElementById("header-root")!;
const app: HTMLElement = document.getElementById("app")!;
const footerRoot: HTMLElement = document.getElementById("footer-root")!;

// Перевірки (додатково для безпеки, можна прибрати, якщо впевнені)
if (!app) throw new Error("Root #app not found");
if (!headerRoot) throw new Error("Header #header-root not found");
if (!footerRoot) throw new Error("Footer #footer-root not found");

// Функція рендеру додатку
async function renderApp(): Promise<void> {
  const page = await resolveRoute();
  renderLayout(page, app, headerRoot, footerRoot);
}

// Рендер при завантаженні сторінки
window.addEventListener("DOMContentLoaded", renderApp);

// Рендер при зміні хеша в URL
window.addEventListener("hashchange", renderApp);

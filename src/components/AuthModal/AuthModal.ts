import { setToken } from "../../auth/auth";
import "./AuthModal.css";

type View = "login" | "register" | "forgot";

export function createAuthModal(onSuccess: () => void): HTMLElement {
    let currentView: View = "login";

    const overlay = document.createElement("div");
    overlay.className = "auth-overlay hidden";

    const modal = document.createElement("div");
    modal.className = "auth-modal";

    overlay.appendChild(modal);

    function render() {
        if (currentView === "login") renderLogin();
        if (currentView === "register") renderRegister();
        if (currentView === "forgot") renderForgot();
    }

    /* ---------------- LOGIN ---------------- */
    function renderLogin() {
        modal.innerHTML = `
      <button class="auth-close">&times;</button>
      <h2>Вхід</h2>

      <form id="loginForm">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Пароль" required />
        <button class="auth-submit">Увійти</button>
      </form>

      <div class="auth-footer">
        <a href="#" data-view="register">Зареєструватися</a>
        <a href="#" data-view="forgot">Забув пароль?</a>
      </div>

      <p class="auth-message"></p>
    `;

        const form = modal.querySelector("#loginForm") as HTMLFormElement;
        const message = modal.querySelector(".auth-message") as HTMLElement;

        form.onsubmit = async (e) => {
            e.preventDefault();
            message.textContent = "";

            const payload = Object.fromEntries(new FormData(form));

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    message.textContent = data.message || "Помилка входу";
                    message.className = "auth-message error";
                    return;
                }

                setToken(data.token);
                overlay.classList.add("hidden");
                onSuccess();
            } catch {
                message.textContent = "Сервер недоступний";
                message.className = "auth-message error";
            }
        };

        bindCommon();
    }

    /* ---------------- REGISTER ---------------- */
    function renderRegister() {
        modal.innerHTML = `
      <button class="auth-close">&times;</button>
      <h2>Реєстрація</h2>

      <form id="registerForm">
        <input type="text" name="name" placeholder="Імʼя" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Пароль (мін. 6)" required />
        <button class="auth-submit">Зареєструватися</button>
      </form>

      <div class="auth-footer single">
        <a href="#" data-view="login">← Назад до входу</a>
      </div>

      <p class="auth-message"></p>
    `;

        const form = modal.querySelector("#registerForm") as HTMLFormElement;
        const message = modal.querySelector(".auth-message") as HTMLElement;

        form.onsubmit = async (e) => {
            e.preventDefault();
            message.textContent = "";

            const payload = Object.fromEntries(new FormData(form));

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/register`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    message.textContent = data.message || "Помилка реєстрації";
                    message.className = "auth-message error";
                    return;
                }

                message.textContent = "Реєстрація успішна 🎉";
                message.className = "auth-message success";
                setTimeout(() => (currentView = "login", render()), 1200);
            } catch {
                message.textContent = "Сервер недоступний";
                message.className = "auth-message error";
            }
        };

        bindCommon();
    }

    /* ---------------- FORGOT ---------------- */
    function renderForgot() {
        modal.innerHTML = `
      <button class="auth-close">&times;</button>
      <h2>Відновлення пароля</h2>

      <form id="forgotForm">
        <input type="email" name="email" placeholder="Ваш Email" required />
        <button class="auth-submit">Надіслати</button>
      </form>

      <div class="auth-footer single">
        <a href="#" data-view="login">← Назад до входу</a>
      </div>

      <p class="auth-message"></p>
    `;

        const form = modal.querySelector("#forgotForm") as HTMLFormElement;
        const message = modal.querySelector(".auth-message") as HTMLElement;

        form.onsubmit = async (e) => {
            e.preventDefault();
            message.textContent = "Лист відправлено 📧";
            message.className = "auth-message success";
        };

        bindCommon();
    }

    /* ---------------- COMMON ---------------- */
    function bindCommon() {
        modal.querySelector(".auth-close")?.addEventListener("click", () => {
            overlay.classList.add("hidden");
        });

        modal.querySelectorAll("[data-view]").forEach((link) =>
            link.addEventListener("click", (e) => {
                e.preventDefault();
                currentView = (link as HTMLElement).dataset.view as View;
                render();
            })
        );
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") overlay.classList.add("hidden");
    });

    render();
    return overlay;
}

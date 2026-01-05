import { setToken } from "../auth/auth";

export async function loginPage(): Promise<string> {
    return `
    <section class="section">
      <div class="container">
        <h2>Вхід</h2>

        <form id="loginForm" class="project-form">
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Пароль" />
          <button type="submit">Увійти</button>
        </form>

        <p id="loginMessage" style="text-align:center;"></p>
      </div>
    </section>
  `;
}

export function initLoginEvents() {
    const form = document.getElementById("loginForm") as HTMLFormElement;
    const message = document.getElementById("loginMessage") as HTMLParagraphElement;

    if (!form || !message) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                message.textContent = data.message || "Помилка входу";
                message.style.color = "red";
                return;
            }

            setToken(data.token);
            window.location.hash = "#home";
        } catch {
            message.textContent = "Сервер недоступний";
            message.style.color = "red";
        }
    });
}

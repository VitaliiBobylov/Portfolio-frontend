// src/pages/auth/login.page.ts
export function loginPage(): HTMLElement {
  const section = document.createElement("section");
  section.className = "section login-section";

  section.innerHTML = `
    <div class="container">
      <h2>Вхід</h2>
      <form id="loginForm" class="auth-form">
        <input 
          id="login-email" 
          type="email" 
          placeholder="Email" 
          required 
          autocomplete="email"
        />
        <input 
          id="login-password" 
          type="password" 
          placeholder="Пароль" 
          required 
          autocomplete="current-password"
        />
        <button type="submit" class="button primary">Увійти</button>
      </form>

      <p id="loginMessage" class="form-message"></p>

      <div class="auth-links">
        <a href="#register">Зареєструватися</a>
        <a href="#forgot-password">Забув пароль?</a>
        <a href="#home">Продовжити без входу</a>
      </div>
    </div>
  `;

  const form = section.querySelector("#loginForm") as HTMLFormElement;
  const message = section.querySelector("#loginMessage") as HTMLParagraphElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (section.querySelector("#login-email") as HTMLInputElement).value.trim();
    const password = (section.querySelector("#login-password") as HTMLInputElement).value;

    if (!email || !password) {
      showMessage(message, "Заповніть email та пароль", "error");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(message, data.message || "Неправильний email або пароль", "error");
        return;
      }

      localStorage.setItem("token", data.token || data.accessToken);
      showMessage(message, "Вхід успішний! Зараз перенаправляємо...", "success");

      setTimeout(() => {
        window.location.hash = "#home";
      }, 1200);

    } catch (err) {
      showMessage(message, "Помилка з'єднання з сервером", "error");
      console.error(err);
    }
  });

  return section;
}

function showMessage(el: HTMLElement, text: string, type: "error" | "success") {
  el.textContent = text;
  el.className = "form-message " + type;
  el.style.color = type === "error" ? "#e74c3c" : "#27ae60";
}
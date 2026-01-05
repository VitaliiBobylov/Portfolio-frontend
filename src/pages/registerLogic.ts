

export function initRegisterEvents(): void {
    const form = document.getElementById("registerForm") as HTMLFormElement;
    const message = document.getElementById("registerMessage") as HTMLParagraphElement;
    if (!form || !message) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (!name || !email || !password) return showMessage(message, "Заповніть усі поля", "error");
        if (password.length < 6) return showMessage(message, "Пароль мінімум 6 символів", "error");
        if (!email.includes("@")) return showMessage(message, "Некоректний email", "error");

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) return showMessage(message, data.message || "Помилка реєстрації", "error");

            showMessage(message, "Реєстрація успішна 🎉", "success");
            form.reset();
        } catch {
            showMessage(message, "Сервер недоступний", "error");
        }
    });
}

// утиліта
export function showMessage(element: HTMLElement, text: string, type: "error" | "success") {
    element.textContent = text;
    element.style.color = type === "error" ? "red" : "green";
}

export async function registerPage(): Promise<string> {
    return `
    <section class="section">
      <div class="container">
        <h2>Реєстрація</h2>

        <form id="registerForm" class="project-form">
          <input type="text" id="name" placeholder="Ім'я" />
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Пароль" />
          <button type="submit">Зареєструватися</button>
        </form>

        <p id="registerMessage" style="text-align:center;"></p>
      </div>
    </section>
  `;
}

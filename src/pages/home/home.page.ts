// src/pages/home/home.page.ts
export function homePage(): HTMLElement {
  const section = document.createElement("section");
  section.className = "section";

  section.innerHTML = `
    <div class="container">
      <h2>Мої послуги</h2>

      <div class="cards">
        <a class="card" href="#portfolio?service=landing">
          <h3>Landing Page</h3>
          <p>Односторінкові сайти для бізнесу</p>
        </a>

        <a class="card" href="#portfolio?service=spa">
          <h3>SPA</h3>
          <p>Сучасні веб-застосунки</p>
        </a>

        <a class="card" href="#portfolio?service=support">
          <h3>Підтримка</h3>
          <p>Оновлення та розвиток проєктів</p>
        </a>
      </div>
    </div>
  `;

  return section;
}

export function portfolioPage(service?: string, isAuthorized = false): HTMLElement {
  const section = document.createElement("section");
  section.className = "section";

  section.innerHTML = `
    <div class="container">
      <h2>Роботи програмістів</h2>
      <p>Ви обрали послугу: ${service || "всі послуги"}</p>
      <div class="portfolio-cards">
        <div class="portfolio-card">
          <h4>Проєкт 1</h4>
          <p>Технічні деталі проєкту</p>
          ${isAuthorized ? '<p>Автор: Ім’я програміста</p>' : ''}
        </div>
        <div class="portfolio-card">
          <h4>Проєкт 2</h4>
          <p>Технічні деталі проєкту</p>
          ${isAuthorized ? '<p>Автор: Ім’я програміста</p>' : ''}
        </div>
      </div>
    </div>
  `;

  return section;
}

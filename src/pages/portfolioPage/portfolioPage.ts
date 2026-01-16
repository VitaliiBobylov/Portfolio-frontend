// Параметр isAuthorized визначає, чи можна показувати авторів
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

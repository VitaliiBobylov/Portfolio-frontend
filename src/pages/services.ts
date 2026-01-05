import { getProjects, createProject, deleteProject, type Project, type NewProject } from "../api/projectsApi";
import { isAuthenticated } from "../auth/auth";

let projects: Project[] = [];

function renderProjectCard(project: Project): string {
  return `
    <div class="home-card">
      <div class="card-img-wrapper">
        <img src="${project.image}" alt="${project.title}">
        ${isAuthenticated() ? `<button class="icon-btn delete-btn" data-id="${project._id}">×</button>` : ""}
      </div>
      <p>${project.description}</p>
      <div class="card-buttons">
        <a class="button" href="${project.link}" target="_blank">Подивитися</a>
        ${isAuthenticated() ? `<button class="button edit-btn" data-id="${project._id}">Редагувати</button>` : ""}
      </div>
    </div>
  `;
}

export async function servicesPage(): Promise<string> {
  projects = await getProjects();

  return `
    <section class="section">
      <div class="container">
        <h2>Проєкти</h2>
        <div class="home-grid" id="projects-grid">
          ${projects.map(renderProjectCard).join("")}
        </div>

        ${isAuthenticated() ? `
        <button id="toggle-form" class="button">Додати новий проєкт</button>
        <form id="project-form" class="project-form hidden">
          <input id="title" placeholder="Назва" required />
          <input id="image" placeholder="Картинка URL" required />
          <textarea id="description" placeholder="Опис" required></textarea>
          <input id="link" placeholder="Посилання" required />
          <button class="button">Додати</button>
        </form>
        ` : ""}
      </div>
    </section>
  `;
}

export function initServicesEvents() {
  const form = document.getElementById("project-form") as HTMLFormElement;
  const grid = document.getElementById("projects-grid");
  const toggleFormBtn = document.getElementById("toggle-form");

  // Показ/схов форми
  toggleFormBtn?.addEventListener("click", () => {
    form?.classList.toggle("hidden");
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const project: NewProject = {
      title: (document.getElementById("title") as HTMLInputElement).value,
      image: (document.getElementById("image") as HTMLInputElement).value,
      description: (document.getElementById("description") as HTMLTextAreaElement).value,
      link: (document.getElementById("link") as HTMLInputElement).value,
    };

    await createProject(project);
    location.reload();
  });

  // Події по кнопках "Редагувати" та "×"
  grid?.addEventListener("click", async (e) => {
    const btn = e.target as HTMLElement;

    if (btn.classList.contains("delete-btn")) {
      await deleteProject(btn.dataset.id!);
      location.reload();
    }

    if (btn.classList.contains("edit-btn")) {
      const id = btn.dataset.id!;
      const project = projects.find(p => p._id === id);
      if (!project) return;

      // Заповнюємо форму для редагування
      if (form) {
        form.classList.remove("hidden");
        (document.getElementById("title") as HTMLInputElement).value = project.title;
        (document.getElementById("image") as HTMLInputElement).value = project.image;
        (document.getElementById("description") as HTMLTextAreaElement).value = project.description;
        (document.getElementById("link") as HTMLInputElement).value = project.link;
      }

      // При сабміті форми перезаписати проект
      form?.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: (document.getElementById("title") as HTMLInputElement).value,
            image: (document.getElementById("image") as HTMLInputElement).value,
            description: (document.getElementById("description") as HTMLTextAreaElement).value,
            link: (document.getElementById("link") as HTMLInputElement).value,
          }),
        });
        location.reload();
      }, { once: true });
    }
  });

  // Сховати кнопки для неавторизованих
  if (!isAuthenticated()) {
    document.querySelectorAll(".edit-btn, .delete-btn").forEach(btn => {
      (btn as HTMLElement).style.display = "none";
    });
  }
}

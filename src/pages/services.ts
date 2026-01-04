import { getProjects, createProject, deleteProject } from "../api/projectsApi";
import type { Project } from "../api/projectsApi";

let projects: Project[] = [];

function renderProjectCard(project: Project): string {
  return `
    <div class="home-card">
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
      <div class="card-buttons">
        <a class="button" href="${project.link}" target="_blank">Подивитися</a>
        <button class="button delete-btn" data-id="${project._id}">Видалити</button>
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

        <form id="project-form" class="project-form">
          <input id="title" placeholder="Назва" required />
          <input id="image" placeholder="Картинка URL" required />
          <textarea id="description" placeholder="Опис" required></textarea>
          <input id="link" placeholder="Посилання" required />
          <button class="button">Додати</button>
        </form>
      </div>
    </section>
  `;
}

export function initServicesEvents() {
  const form = document.getElementById("project-form") as HTMLFormElement;
  const grid = document.getElementById("projects-grid");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const project = {
      title: (document.getElementById("title") as HTMLInputElement).value,
      image: (document.getElementById("image") as HTMLInputElement).value,
      description: (
        document.getElementById("description") as HTMLTextAreaElement
      ).value,
      link: (document.getElementById("link") as HTMLInputElement).value,
    };

    await createProject(project);
    location.reload();
  });

  grid?.addEventListener("click", async (e) => {
    const btn = e.target as HTMLElement;
    if (btn.classList.contains("delete-btn")) {
      await deleteProject(btn.dataset.id!);
      location.reload();
    }
  });
}

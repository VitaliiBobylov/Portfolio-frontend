// src/pages/services/services.ts

import "./services.css";

import {
  getProjects,
  createProject,
  deleteProject,
  type Project,
  type NewProject,
} from "../../api/projectsApi";
import { isAuthenticated, getCurrentUserId } from "../../auth/auth";

export async function servicesPage(): Promise<HTMLElement> {
  const projects: Project[] = await getProjects();
  const authenticated = isAuthenticated();
  const currentUserId = getCurrentUserId();
  let editProjectId: string | null = null;

  const section = document.createElement("section");
  section.className = "section";

  section.innerHTML = `
  <div class="container">
    <h2>Проєкти</h2>
    <div class="services-grid" id="projects-grid">
      ${projects
      .map((p) => {
        const isOwner = authenticated && currentUserId === p.authorId;
        return `
            <div class="services-card">
              <div class="card-img-wrapper">
                <img src="${p.image}" alt="${p.title}" />
                ${isOwner ? `<button class="delete-btn icon-btn" data-id="${p._id}">×</button>` : ""}
              </div>
              <p>${p.description}</p>
              <div class="card-buttons">
                <a class="button" href="${p.link}" target="_blank">Подивитися</a>
                ${isOwner ? `<button class="button edit-btn" data-id="${p._id}">Редагувати</button>` : ""}
              </div>
            </div>
          `;
      })
      .join("")}
    </div>

    ${authenticated ? `
      <button id="toggle-form" class="add-project-btn">Додати проєкт</button>
      <div id="project-modal" class="modal hidden">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <button id="close-modal" class="modal-close">×</button>
          <form id="project-form" class="project-form">
            <input id="title" placeholder="Назва" required />
            <input id="image" placeholder="Картинка URL" required />
            <textarea id="description" placeholder="Опис" required></textarea>
            <input id="link" placeholder="Посилання на живу сторінку" required />
            <button class="button">Зберегти</button>
          </form>
        </div>
      </div>
    ` : ""}
  </div>
`;

  const grid = section.querySelector("#projects-grid") as HTMLElement;
  const modal = section.querySelector("#project-modal") as HTMLElement | null;
  const openBtn = section.querySelector("#toggle-form") as HTMLElement | null;
  const closeBtn = section.querySelector("#close-modal") as HTMLElement | null;
  const form = section.querySelector("#project-form") as HTMLFormElement | null;

  if (authenticated) {
    openBtn?.addEventListener("click", () => {
      editProjectId = null;
      form?.reset();
      modal?.classList.remove("hidden");
    });

    closeBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
    modal?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
        modal?.classList.add("hidden");
      }
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form) return;

      const payload: NewProject = {
        title: (form.querySelector("#title") as HTMLInputElement).value,
        image: (form.querySelector("#image") as HTMLInputElement).value,
        description: (form.querySelector("#description") as HTMLTextAreaElement).value,
        link: (form.querySelector("#link") as HTMLInputElement).value,
      };

      try {
        if (editProjectId) {
          await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${editProjectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          await createProject(payload);
        }
        location.reload();
      } catch (err) {
        console.error(err);
      }
    });

    grid?.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      if (!target.dataset.id) return;

      const projectId = target.dataset.id;
      const project = projects.find((p) => p._id === projectId);
      if (!project) return;

      const isOwner = currentUserId === project.authorId;

      if (target.classList.contains("delete-btn") && isOwner) {
        await deleteProject(projectId);
        location.reload();
      }

      if (target.classList.contains("edit-btn") && isOwner) {
        editProjectId = projectId;
        modal?.classList.remove("hidden");
        (form?.querySelector("#title") as HTMLInputElement).value = project.title;
        (form?.querySelector("#image") as HTMLInputElement).value = project.image;
        (form?.querySelector("#description") as HTMLTextAreaElement).value = project.description;
        (form?.querySelector("#link") as HTMLInputElement).value = project.link;
      }
    });
  }

  return section;
}

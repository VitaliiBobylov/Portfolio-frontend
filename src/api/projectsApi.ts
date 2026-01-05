// src/data/projects.ts

// 1️⃣ берем URL из .env
const API_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

export interface Project {
  _id: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

export type NewProject = Omit<Project, "_id">;

// 2️⃣ Получаем все проекты
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

// 3️⃣ Создаем проект (POST)
export async function createProject(project: Omit<Project, "_id">) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

// 4️⃣ Удаляем проект (DELETE)
export async function deleteProject(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}

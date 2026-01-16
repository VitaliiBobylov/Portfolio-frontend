// src/api/projectsApi.ts
const API_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

export interface Project {
  _id: string;
  title: string;
  image: string;
  description: string;
  link: string;
  authorId: string;
  authorName?: string;
}

export type NewProject = Omit<Project, "_id" | "authorId" | "authorName">;

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(project: NewProject) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}

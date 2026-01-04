const API_URL = "http://localhost:5000/api/projects";

export interface Project {
  _id: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createProject(project: Omit<Project, "_id">) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function deleteProject(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

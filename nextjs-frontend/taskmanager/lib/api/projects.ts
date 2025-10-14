import { apiClient } from "./client";

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  taskId: number; 
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  ownerId: number;
  taskId: number; // convert to array
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  ownerId?: number;
  taskId?: number;
}

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get("/projects");
  return response.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (
  project: CreateProjectDto
): Promise<Project> => {
  console.log("api new project:", project);
  const response = await apiClient.post("/projects", project);
  return response.data;
};

export const updateProject = async (
  id: number,
  project: UpdateProjectDto
): Promise<Project> => {
  const response = await apiClient.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
};

import { Task } from "./task";

export interface Project {
  id: number;
  name: string;
  description?: string;
  tasks?: Task[];
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  userId: number;
  tasks?: Task[];
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  tasks?: Task[];
  // userId?: number, // Not yet assigned in updateProject() in backend
}

import { Task } from "./task";

export interface Project {
  id: number;
  name: string;
  description?: string;
  tasks?: Task[];
}

export interface CreateProjectDto {
  name: string;
  userId: number;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

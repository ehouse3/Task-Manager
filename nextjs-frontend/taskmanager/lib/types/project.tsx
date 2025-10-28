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
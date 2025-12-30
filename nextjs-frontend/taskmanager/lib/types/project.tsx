export interface Project {
  id: number;
  name: string;
  description: string;
  userId: number;
  taskIds?: number[];
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  userId: number;
  taskIds?: number[];
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  taskIds?: number[];
  // userId?: number, // Not yet assigned in updateProject() in backend
}

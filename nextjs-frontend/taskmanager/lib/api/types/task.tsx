export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

export interface CreateTaskDto {
  title: string;
  projectId: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

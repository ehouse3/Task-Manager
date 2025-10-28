export interface Task {
    id: number;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    projectId: number;
    assignedToId?: number;
    dueDate?: string;
}

export interface CreateTaskDto {
    title: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    projectId: number;
    assignedToId?: number;
    dueDate?: string;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    projectId?: number;
    assignedToId?: number;
    dueDate?: string;
    
}
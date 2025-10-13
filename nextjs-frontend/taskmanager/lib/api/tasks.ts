import { apiClient } from "./client";

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

export const getAllTasks = async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks');
    return response.data;
}

export const getTaskById = async (id: number): Promise<Task> => {
    const response = await apiClient.get(`tasks/${id}`);
    return response.data;
}

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
    const response = await apiClient.post('/tasks', task);
    return response.data;
}

export const updateTask = async (id: number, task: UpdateTaskDto): Promise<Task> => {
    const response  = await apiClient.put(`/tasks/${id}`, task);
    return response.data;
}

export const deleteTask = async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
}



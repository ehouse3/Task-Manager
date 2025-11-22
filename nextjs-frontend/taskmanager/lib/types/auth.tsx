import { UserRole } from "./user";

export interface AuthResponse {
    token: string,
    userId: number,
    username: string,
    email: string,
    role: UserRole
}

export interface LoginRequest {
    username: string,
    password: string
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

// add username conflict, email conflict?
export enum LoginResult {
    SUCCESS, FAILED
}
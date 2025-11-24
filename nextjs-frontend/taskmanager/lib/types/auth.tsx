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

// add more descriptors for login results
export enum LoginResult {
    FAILED, SUCCESS
}

// add username conflict and email conflict?
export enum RegisterResult {
    FAILED, SUCCESS
}
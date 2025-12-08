// Define User type matching backend entity
export interface User {
  id: number;
  username: string;
  userRole: UserRole;
  email: string;
  nickname?: string;
}

export enum UserRole {
  USER,
  ADMIN,
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  nickname?: string;
}

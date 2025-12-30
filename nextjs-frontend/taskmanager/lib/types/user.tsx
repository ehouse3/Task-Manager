// Define User type matching backend entity
export interface User {
  id: number;
  username: string;
  role: UserRole;
  email: string;
  nickname?: string;
  projectIds?: number[];
}

export enum UserRole {
  USER,
  ADMIN,
}

export interface UpdateUserDto {
  username?: string;
  role?: UserRole;
  email?: string;
  password?: string;
  nickname?: string;
  projectIds?: number[];
}

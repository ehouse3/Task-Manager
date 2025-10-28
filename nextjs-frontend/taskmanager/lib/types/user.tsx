// Define User type matching backend entity
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  nickname?: string;
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
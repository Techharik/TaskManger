import type { UserEntity } from "../entities/UserEntity";

export interface userRepo {
  getUserById: (id: string) => Promise<UserEntity | null>;
  // updateUser: (id: number) => Promise<any>;
  create: (user: UserEntity) => Promise<UserEntity>;
  // deleteUser: (id: number) => Promise<any>;
  getUserByEmail: (email: string) => Promise<UserEntity | null>;
}

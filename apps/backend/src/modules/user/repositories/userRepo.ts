import type { UserEntity } from "../entities/UserEntity";

export interface userRepo {
  getUserById: (id: string) => Promise<UserEntity | null>;
  updateUser: (id: string, data: any) => Promise<UserEntity>;
  create: (user: UserEntity) => Promise<UserEntity>;
  deleteUser: (id: string) => Promise<Boolean>;
  getUserByEmail: (email: string) => Promise<UserEntity | null>;
}

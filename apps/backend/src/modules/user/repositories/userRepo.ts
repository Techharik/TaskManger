import type { UserEntity } from "../entities/UserEntity";

export interface userRepo {
  // getUser: (id: number) => Promise<any>;
  // updateUser: (id: number) => Promise<any>;
  create: (user: UserEntity) => Promise<UserEntity>;
  // deleteUser: (id: number) => Promise<any>;
  getUserByEmail: (email: string) => Promise<any>;
}

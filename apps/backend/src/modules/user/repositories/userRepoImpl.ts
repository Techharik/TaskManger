import type { registerDto } from "@repo/types";
import type { userRepo } from "./userRepo";
import { prisma } from "../../../shared/db/prisma";
import { UserImpl } from "../entities/UserEntityImpl";
import type { UserEntity } from "../entities/UserEntity";

export class userRepoImpl implements userRepo {
  async getUserByEmail(email: string) {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const result = await prisma.user.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return new UserImpl(result.id, result.name, result.email, result.password);
  }
}

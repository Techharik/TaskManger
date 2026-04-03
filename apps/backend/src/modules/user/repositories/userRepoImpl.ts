import type { userRepo } from "./userRepo";
import { prisma } from "../../../shared/db/prisma";
import { UserImpl } from "../entities/UserEntityImpl";
import type { UserEntity } from "../entities/UserEntity";

export class userRepoImpl implements userRepo {
  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result
      ? new UserImpl(
          result?.id.toString(),
          result?.name,
          result?.email,
          result?.password,
        )
      : null;
  }
  async create(data: UserEntity): Promise<UserEntity> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return new UserImpl(result.id, result.name, result.email, result.password);
  }
  async getUserById(id: string): Promise<UserEntity | null> {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return result
      ? new UserImpl(
          result?.id.toString(),
          result?.name,
          result?.email,
          result?.password,
        )
      : null;
  }
  async deleteUser(id: string): Promise<Boolean> {
    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return result ? true : false;
  }
}

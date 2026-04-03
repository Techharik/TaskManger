import type { userRepo } from "./userRepo";
import { prisma } from "../../../shared/db/prisma";
import { UserImpl } from "../entities/UserEntityImpl";
import type { UserEntity } from "../entities/UserEntity";
import { NotFoundError } from "../../../shared/utils/errorHandler";

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
        about: data.about ?? "",
      },
    });
    console.log(result);
    return new UserImpl(
      result.id,
      result.name,
      result.email,
      result.password,
      result.about ?? "",
    );
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
          result.about ?? "",
        )
      : null;
  }

  async updateUser(id: string, data: any): Promise<UserEntity> {
    const updates: any = {};

    if (data.name) updates.name = data.name;
    if (data.email) updates.email = data.email;
    if (data.about) updates.about = data.about;

    const updated = await prisma.user.update({
      where: {
        id: id,
      },
      data: updates,
    });

    if (!updated) {
      throw new NotFoundError("Event not found");
    }

    return new UserImpl(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.about ?? "",
    );
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

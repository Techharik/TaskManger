import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../../shared/utils/errorHandler";
import { UserImpl } from "../entities/UserEntityImpl";
import type { userRepo } from "../repositories/userRepo";
import type { IuserValidator } from "../validators/user.validator";

export class UserService {
  constructor(
    private validator: IuserValidator,
    private repo: userRepo,
  ) {}
  register = async (data: any) => {
    const dto = this.validator.validateRegister(data);
    const exists = await this.repo.getUserByEmail(dto.email);

    if (exists) throw new ConflictError("Email already exists");

    const userEnity = await UserImpl.create(
      "",
      dto.name,
      dto.email,
      dto.password,
      dto.about ?? ""
    );

    const user = await this.repo.create(userEnity);

    return user;
  };
  getUser = async (id: string) => {
    const exists = await this.repo.getUserById(id);

    if (!exists) throw new NotFoundError("user not found");
    // hide password
    exists.password = "";
    return exists;
  };

  updateUser = async (id: string, data: any) => {
    //validate the data
    const dto = this.validator.validateUpdate(data);
    const user = await this.repo.getUserById(id);
    if (!user) {
      throw new NotFoundError("user not found");
    }

    const result = await this.repo.updateUser(id, dto);
    return result;
  };

  deleteUser = async (id: string) => {
    if (!id) {
      throw new ValidationError("Id is not provided");
    }

    const exists = await this.repo.getUserById(id);
    if (!exists) {
      throw new NotFoundError("User not found");
    }

    const result = this.repo.deleteUser(id);
    return result;
  };
}

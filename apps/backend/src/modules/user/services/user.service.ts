import { ConflictError } from "../../../shared/utils/errorHandler";
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

    //entity;
    const userEnity = await UserImpl.create(
      "",
      dto.name,
      dto.email,
      dto.password,
    );

    const user = await this.repo.create(userEnity);

    return user;
  };
}

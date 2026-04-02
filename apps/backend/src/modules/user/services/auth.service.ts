import {
  NotFoundError,
  ValidationError,
} from "../../../shared/utils/errorHandler";
import { createToken } from "../../../shared/utils/jwt";
import type { userRepo } from "../repositories/userRepo";
import type { IuserValidator } from "../validators/user.validator";

export class authService {
  constructor(
    private validate: IuserValidator,
    private repo: userRepo,
  ) {}
  login = async (data: any) => {
    const dto = this.validate.validateLogin(data);

    const exists = await this.repo.getUserByEmail(dto.email);

    if (!exists) throw new NotFoundError("Email not exists");

    const comparePassword = await exists.verifyPassword(dto.password);

    if (!comparePassword)
      throw new ValidationError(
        "Password mismatch, Enter the correct the password",
      );
    const token = createToken(exists);
    return {
      token,
    };
  };
}

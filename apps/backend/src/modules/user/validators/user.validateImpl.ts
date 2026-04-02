import {
  loginSchema,
  registerSchema,
  type loginDto,
  type registerDto,
} from "@repo/types";
import type { IuserValidator } from "./user.validator";
import { ValidationError } from "../../../shared/utils/errorHandler";

export class userValidateImpl implements IuserValidator {
  validateRegister(user: any): registerDto {
    const result = registerSchema.safeParse(user);

    if (!result.success) {
      const msg = result.error.issues[0].message;
      console.log(msg, "mmm");
      throw new ValidationError(msg);
    }
    return result.data;
  }
  validateLogin(user: any): loginDto {
    const result = loginSchema.safeParse(user);
    if (!result.success) {
      const msg = result.error?.issues[0].message;
      throw new ValidationError(msg);
    }
    return result.data;
  }
}

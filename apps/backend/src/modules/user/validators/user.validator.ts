import { registerDto, loginDto } from "@repo/types";

export interface IuserValidator {
  validateRegister(user: any): registerDto;
  validateLogin(user: any): loginDto;
}

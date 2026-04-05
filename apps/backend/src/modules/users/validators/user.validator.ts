import { registerDto, loginDto, type updateDto } from "@repo/types";

export interface IuserValidator {
  validateRegister(user: any): registerDto;
  validateLogin(user: any): loginDto;
  validateUpdate(user: any): updateDto;
}

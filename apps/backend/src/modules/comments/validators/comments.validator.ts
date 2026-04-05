import { createCommentSchema, type CreateCommentDto } from "@repo/types";
import { ValidationError } from "../../../shared/utils/errorHandler";

export interface IcommentValidator {
  validateCreate(data: unknown): CreateCommentDto;
}

export class commentValidatorImpl implements IcommentValidator {
  private parse<T>(schema: any, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(result.error.issues[0]?.message);
    }
    return result.data;
  }

  validateCreate(data: unknown) {
    return this.parse<CreateCommentDto>(createCommentSchema, data);
  }
}

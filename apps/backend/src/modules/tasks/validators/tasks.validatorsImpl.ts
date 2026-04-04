import {
  createTaskSchema,
  updateTaskSchema,
  updateStatusSchema,
  assignTaskSchema,
  type CreateTaskDto,
  type UpdateTaskDto,
  type UpdateStatusDto,
  type AssignTaskDto,
} from "@repo/types";

import { ValidationError } from "../../../shared/utils/errorHandler";

export interface ItaskValidator {
  validateCreate(data: unknown): CreateTaskDto;
  validateUpdate(data: unknown): UpdateTaskDto;
  validateStatus(data: unknown): UpdateStatusDto;
  validateAssign(data: unknown): AssignTaskDto;
}

export class taskValidatorImpl implements ItaskValidator {
  private parse<T>(schema: any, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(result.error.issues[0]?.message);
    }
    return result.data;
  }

  validateCreate(data: unknown) {
    return this.parse<CreateTaskDto>(createTaskSchema, data);
  }

  validateUpdate(data: unknown) {
    return this.parse<UpdateTaskDto>(updateTaskSchema, data);
  }

  validateStatus(data: unknown) {
    return this.parse<UpdateStatusDto>(updateStatusSchema, data);
  }

  validateAssign(data: unknown) {
    return this.parse<AssignTaskDto>(assignTaskSchema, data);
  }
}

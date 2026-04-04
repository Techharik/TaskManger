import {
  createTeamSchema,
  updateTeamSchema,
  addMemberSchema,
  type CreateTeamDto,
  type UpdateTeamDto,
  type AddMemberDto,
} from "@repo/types";

import type { IteamsValidator } from "./teams.validator";
import { ValidationError } from "../../../shared/utils/errorHandler";

export class teamsValidatorImpl implements IteamsValidator {
  private parse<T>(schema: any, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
      const msg = result.error.issues[0]?.message;
      throw new ValidationError(msg);
    }

    return result.data;
  }

  validateCreate(data: unknown): CreateTeamDto {
    return this.parse<CreateTeamDto>(createTeamSchema, data);
  }

  validateUpdate(data: unknown): UpdateTeamDto {
    return this.parse<UpdateTeamDto>(updateTeamSchema, data);
  }

  validateAddMember(data: unknown): AddMemberDto {
    return this.parse<AddMemberDto>(addMemberSchema, data);
  }
}

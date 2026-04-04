import type { CreateTeamDto, UpdateTeamDto, AddMemberDto } from "@repo/types";

export interface IteamsValidator {
  validateCreate(data: unknown): CreateTeamDto;
  validateUpdate(data: unknown): UpdateTeamDto;
  validateAddMember(data: unknown): AddMemberDto;
}

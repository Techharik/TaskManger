import type { ProjectRole } from "../../../../generated/prisma/enums";
import { teamsEntityImpl } from "../entities/teamEntityImpl";

export interface IteamsRepository {
  createTeam(data: any, userId: string): Promise<teamsEntityImpl>;
  findUserTeams(userId: string): Promise<teamsEntityImpl[]>;
  findById(projectId: string, userId: string): Promise<teamsEntityImpl | null>;
  update(
    projectId: string,
    data: any,
    userId: string,
  ): Promise<teamsEntityImpl>;
  delete(projectId: string): Promise<void>;
  addMember(
    projectId: string,
    userId: string,
    role: ProjectRole,
    requesterId: string,
  ): Promise<teamsEntityImpl>;
  removeMember(projectId: string, userId: string): Promise<void>;
  getTasks(projectId: string): Promise<any>;
}

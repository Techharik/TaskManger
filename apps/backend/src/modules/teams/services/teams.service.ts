// modules/team/services/teams.service.ts

import { teamsEntityImpl } from "../entities/teamEntityImpl";
import type { IteamsRepository } from "../repositories/teams.repo";
import type { IteamsValidator } from "../validators/teams.validator";

export class teamsService {
  constructor(
    private repo: IteamsRepository,
    private validator: IteamsValidator,
  ) {}

  async create(payload: unknown, userId: string) {
    const dto = this.validator.validateCreate(payload);
    const team = await this.repo.createTeam(dto, userId);
    return team.toJSON();
  }

  async getMyTeams(userId: string) {
    const teams = await this.repo.findUserTeams(userId);
    return teams.map((t: any) => t.toJSON());
  }

  async getById(projectId: string, userId: string) {
    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureMember();
    return team.toJSON();
  }

  async update(projectId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateUpdate(payload);

    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureAdmin();

    const updated = await this.repo.update(projectId, dto, userId);
    return updated.toJSON();
  }

  async delete(projectId: string, userId: string) {
    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureAdmin();

    await this.repo.delete(projectId);
  }

  async addMember(projectId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateAddMember(payload);

    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureAdmin();

    const updated = await this.repo.addMember(
      projectId,
      dto.targetUserId,
      dto.role ?? "MEMBER",
      userId,
    );

    return updated.toJSON();
  }

  async removeMember(projectId: string, targetUserId: string, userId: string) {
    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureAdmin();

    await this.repo.removeMember(projectId, targetUserId);
  }

  async getTeamTasks(projectId: string, userId: string) {
    const team = await this.repo.findById(projectId, userId);
    if (!team) throw new Error("Project not found");

    team.ensureMember();

    return this.repo.getTasks(projectId);
  }
}

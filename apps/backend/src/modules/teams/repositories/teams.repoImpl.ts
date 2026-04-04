// modules/team/repositories/teams.repository.ts

import { ProjectRole } from "../../../../generated/prisma/enums";
import { prisma } from "../../../shared/db/prisma";
import { teamsEntityImpl } from "../entities/teamEntityImpl";
import type { IteamsRepository } from "./teams.repo";

export class teamsRepositoryImpl implements IteamsRepository {
  async createTeam(data: any, userId: string) {
    console.log("prisma", data, userId);

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        photo: data.photo,
        memberships: {
          create: [
            {
              user: {
                connect: { id: userId },
              },
              role: ProjectRole.ADMIN,
            },
          ],
        },
      },
      include: {
        memberships: true,
      },
    });

    return new teamsEntityImpl(project, project.memberships[0]);
  }

  async findUserTeams(userId: string) {
    const projects = await prisma.project.findMany({
      where: {
        memberships: { some: { userId } },
      },
      include: {
        memberships: {
          where: { userId },
        },
      },
    });

    return projects.map((p) => new teamsEntityImpl(p, p.memberships[0]));
  }

  async findById(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) return null;

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return new teamsEntityImpl(project, membership);
  }

  async update(projectId: string, data: any, userId: string) {
    const project = await prisma.project.update({
      where: { id: projectId },
      data,
    });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return new teamsEntityImpl(project, membership);
  }

  async delete(projectId: string) {
    await prisma.project.delete({
      where: { id: projectId },
    });
  }

  async addMember(
    projectId: string,
    userId: string,
    role: ProjectRole,
    requesterId: string,
  ) {
    await prisma.projectMembership.create({
      data: {
        projectId,
        userId,
        role,
      },
    });

    return this.findById(projectId, requesterId) as any;
  }

  async removeMember(projectId: string, userId: string) {
    await prisma.projectMembership.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });
  }

  getTasks(projectId: string) {
    return prisma.task.findMany({
      where: { projectId },
    });
  }
}

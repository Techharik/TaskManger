import type { TaskStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../shared/db/prisma";
import { taskEntityImpl } from "../entities/tasks.entity";

export interface ItaskRepository {
  create(data: any): Promise<taskEntityImpl>;
  findById(taskId: string, userId: string): Promise<taskEntityImpl | null>;
  update(taskId: string, data: any, userId: string): Promise<taskEntityImpl>;
  delete(taskId: string): Promise<void>;
  updateStatus(
    taskId: string,
    status: TaskStatus,
    userId: string,
  ): Promise<taskEntityImpl>;
  assign(
    taskId: string,
    userId: string,
    requesterId: string,
  ): Promise<taskEntityImpl>;
  getMyTasks(userId: string): Promise<any>;
  list(filters: any, userId: string): Promise<any>;
}

export class taskRepositoryImpl implements ItaskRepository {
  async create(data: any) {
    const task = await prisma.task.create({
      data,
    });

    return new taskEntityImpl(task, null);
  }

  async findById(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) return null;

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.projectId,
        },
      },
    });

    return new taskEntityImpl(task, membership);
  }

  async update(taskId: string, data: any, userId: string) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return new taskEntityImpl(task, null);
  }

  async delete(taskId: string) {
    await prisma.task.delete({
      where: { id: taskId },
    });
  }

  async updateStatus(taskId: string, status: TaskStatus, userId: string) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return new taskEntityImpl(task, null);
  }

  async assign(taskId: string, userId: string, requesterId: string) {
    await prisma.taskAssignment.create({
      data: {
        taskId,
        userId,
      },
    });

    return this.findById(taskId, requesterId) as any;
  }

  getMyTasks(userId: string) {
    return prisma.taskAssignment.findMany({
      where: { userId },
      include: { task: true },
    });
  }

  list(filters: any, userId: string) {
    return prisma.task.findMany({
      where: {
        project: {
          memberships: {
            some: { userId },
          },
        },
        ...(filters.status && { status: filters.status }),
      },
    });
  }
}

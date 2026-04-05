import { prisma } from "../../../shared/db/prisma";
import { commentEntityImpl } from "../entities/comments.entity";

export interface IcommentRepository {
  create(taskId: string, userId: string, data: any): Promise<commentEntityImpl>;
  findByTask(taskId: string, userId: string): Promise<commentEntityImpl[]>;
  findById(id: string, userId: string): Promise<commentEntityImpl | null>;
  delete(id: string): Promise<void>;
}

export class commentRepositoryImpl implements IcommentRepository {
  async create(taskId: string, userId: string, data: any) {
    const comment = await prisma.taskComment.create({
      data: {
        ...data,
        taskId,
        userId,
      },
    });

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task!.projectId,
        },
      },
    });

    return new commentEntityImpl(comment, membership, userId);
  }

  async findByTask(taskId: string, userId: string) {
    const comments = await prisma.taskComment.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" },
    });

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task!.projectId,
        },
      },
    });

    return comments.map((c) => new commentEntityImpl(c, membership, userId));
  }

  async findById(id: string, userId: string) {
    const comment = await prisma.taskComment.findUnique({
      where: { id },
    });

    if (!comment) return null;

    const task = await prisma.task.findUnique({
      where: { id: comment.taskId },
    });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task!.projectId,
        },
      },
    });

    return new commentEntityImpl(comment, membership, userId);
  }

  async delete(id: string) {
    await prisma.taskComment.delete({
      where: { id },
    });
  }
}

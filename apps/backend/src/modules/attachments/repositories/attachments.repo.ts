import { prisma } from "../../../shared/db/prisma";
import { attachmentEntityImpl } from "../entities/attachments.entitiy";

export interface IattachmentRepository {
  create(data: any): Promise<attachmentEntityImpl>;
  findByTask(taskId: string, userId: string): Promise<attachmentEntityImpl[]>;
  findById(id: string, userId: string): Promise<attachmentEntityImpl | null>;
  delete(id: string): Promise<void>;
}

export class attachmentRepositoryImpl implements IattachmentRepository {
  async create(data: any) {
    const attachment = await prisma.taskAttachment.create({ data });

    return new attachmentEntityImpl(attachment, null);
  }

  async findByTask(taskId: string, userId: string) {
    const attachments = await prisma.taskAttachment.findMany({
      where: { taskId },
    });

    const task = await prisma.task.findUnique({ where: { id: taskId } });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task!.projectId,
        },
      },
    });

    return attachments.map(
      (a: any) => new attachmentEntityImpl(a, membership, userId),
    );
  }

  async findById(id: string, userId: string) {
    const attachment = await prisma.taskAttachment.findUnique({
      where: { id },
    });

    if (!attachment) return null;

    const task = await prisma.task.findUnique({
      where: { id: attachment.taskId },
    });

    const membership = await prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task!.projectId,
        },
      },
    });

    return new attachmentEntityImpl(attachment, membership, userId);
  }

  async delete(id: string) {
    await prisma.taskAttachment.delete({ where: { id } });
  }
}

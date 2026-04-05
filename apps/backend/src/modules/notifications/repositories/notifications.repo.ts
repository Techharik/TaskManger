import { prisma } from "../../../shared/db/prisma";
import { notificationEntityImpl } from "../entities/notifications.entity";

export interface InotificationRepository {
  create(data: any): Promise<notificationEntityImpl>;
  findByUser(userId: string): Promise<notificationEntityImpl[]>;
  findById(id: string): Promise<notificationEntityImpl | null>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  countUnread(userId: string): Promise<number>;
}

export class notificationRepositoryImpl implements InotificationRepository {
  async create(data: any) {
    const notif = await prisma.notification.create({ data });
    return new notificationEntityImpl(notif);
  }

  async findByUser(userId: string) {
    const list = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return list.map((n) => new notificationEntityImpl(n));
  }

  async findById(id: string) {
    const notif = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notif) return null;

    return new notificationEntityImpl(notif);
  }

  async markAsRead(id: string) {
    await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async countUnread(userId: string) {
    return prisma.notification.count({
      where: { userId, read: false },
    });
  }
}

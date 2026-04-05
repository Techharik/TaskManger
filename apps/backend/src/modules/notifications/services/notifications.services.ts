import { sendNotification } from "../../../shared/ws/notifications.gateway";
import type { InotificationRepository } from "../repositories/notifications.repo";

export class notificationService {
  constructor(private repo: InotificationRepository) {}

  async list(userId: string) {
    const list = await this.repo.findByUser(userId);
    return list.map((n: any) => n.toJSON());
  }

  async unreadCount(userId: string) {
    return this.repo.countUnread(userId);
  }

  async markAsRead(id: string, userId: string) {
    const notif = await this.repo.findById(id);
    if (!notif) throw new Error("Not found");

    notif.ensureOwner(userId);

    await this.repo.markAsRead(id);

    return { success: true };
  }

  async markAllAsRead(userId: string) {
    await this.repo.markAllAsRead(userId);
    return { success: true };
  }

  async create(userId: string, data: any) {
    const notif = await this.repo.create({
      userId,
      ...data,
    });

    sendNotification(userId, notif.toJSON());

    return notif;
  }
}

export class notificationEntityImpl {
  constructor(private notification: any) {}

  ensureOwner(userId: string) {
    if (this.notification.userId !== userId) {
      throw new Error("Access denied");
    }
  }

  markAsRead() {
    this.notification.read = true;
  }

  toJSON() {
    return {
      id: this.notification.id,
      type: this.notification.type,
      message: this.notification.message,
      entityId: this.notification.entityId,
      read: this.notification.read,
      createdAt: this.notification.createdAt,
    };
  }
}

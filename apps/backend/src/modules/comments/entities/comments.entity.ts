export class commentEntityImpl {
  constructor(
    private comment: any,
    private membership: any,
    private userId?: string,
  ) {}

  ensureMember() {
    if (!this.membership) {
      throw new Error("Access denied");
    }
  }

  ensureOwnerOrAdmin() {
    if (
      this.comment.userId !== this.userId &&
      this.membership?.role !== "ADMIN"
    ) {
      throw new Error("Not allowed to delete this comment");
    }
  }

  toJSON() {
    return {
      id: this.comment.id,
      content: this.comment.content,
      taskId: this.comment.taskId,
      userId: this.comment.userId,
      createdAt: this.comment.createdAt,
    };
  }
}

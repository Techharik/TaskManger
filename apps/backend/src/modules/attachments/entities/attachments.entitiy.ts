export class attachmentEntityImpl {
  constructor(
    private attachment: any,
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
      this.attachment.userId !== this.userId &&
      this.membership?.role !== "ADMIN"
    ) {
      throw new Error("Not allowed");
    }
  }

  toJSON() {
    return {
      id: this.attachment.id,
      fileName: this.attachment.fileName,
      fileUrl: this.attachment.fileUrl,
      taskId: this.attachment.taskId,
      createdAt: this.attachment.createdAt,
    };
  }
}

export class taskEntityImpl {
  constructor(
    private task: any,
    private membership: any,
  ) {}

  ensureExists() {
    if (!this.task) throw new Error("Task not found");
  }

  ensureMember() {
    if (!this.membership) throw new Error("Access denied");
  }

  ensureCanModify() {
    if (!this.membership || this.membership.role === "VIEWER") {
      throw new Error("Not allowed");
    }
  }

  validateStatusTransition(newStatus: string) {
    const current = this.task.status;

    if (current === "DONE" && newStatus !== "DONE") {
      throw new Error("Cannot change completed task");
    }
  }
  toJSON() {
    return {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      projectId: this.task.projectId,
    };
  }
}

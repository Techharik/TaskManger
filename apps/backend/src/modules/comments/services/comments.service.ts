import type { IcommentRepository } from "../repositories/comments.repo";
import type { IcommentValidator } from "../validators/comments.validator";

export class commentService {
  constructor(
    private repo: IcommentRepository,
    private validator: IcommentValidator,
  ) {}

  async create(taskId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateCreate(payload);
    const comment = await this.repo.create(taskId, userId, dto);

    comment.ensureMember();

    return comment.toJSON();
  }

  async list(taskId: string, userId: string) {
    const comments = await this.repo.findByTask(taskId, userId);

    if (comments.length) {
      comments[0].ensureMember();
    }

    return comments.map((c: any) => c.toJSON());
  }

  async delete(id: string, userId: string) {
    const comment = await this.repo.findById(id, userId);
    if (!comment) throw new Error("Comment not found");

    comment.ensureMember();
    comment.ensureOwnerOrAdmin();

    await this.repo.delete(id);
  }
}

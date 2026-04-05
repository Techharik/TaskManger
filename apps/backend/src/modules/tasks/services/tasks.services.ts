import type { ItaskRepository } from "../repositories/tasks.repo";
import type { ItaskValidator } from "../validators/tasks.validatorsImpl";

export class taskService {
  constructor(
    private repo: ItaskRepository,
    private validator: ItaskValidator,
  ) {}

  async create(payload: unknown, userId: string) {
    const dto = this.validator.validateCreate(payload);
    const task = await this.repo.create(dto);
    return task.toJSON();
  }

  async getById(taskId: string, userId: string) {
    const task = await this.repo.findById(taskId, userId);
    if (!task) throw new Error("Task not found");

    task.ensureMember();

    return task;
  }

  async update(taskId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateUpdate(payload);

    const task = await this.repo.findById(taskId, userId);
    if (!task) throw new Error("Task not found");

    task.ensureCanModify();

    return this.repo.update(taskId, dto, userId);
  }

  async delete(taskId: string, userId: string) {
    const task = await this.repo.findById(taskId, userId);
    if (!task) throw new Error("Task not found");

    task.ensureCanModify();

    await this.repo.delete(taskId);
  }

  async updateStatus(taskId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateStatus(payload);

    const task = await this.repo.findById(taskId, userId);
    if (!task) throw new Error("Task not found");

    task.ensureCanModify();
    task.validateStatusTransition(dto.status);

    return this.repo.updateStatus(taskId, dto.status, userId);
  }

  async assign(taskId: string, payload: unknown, userId: string) {
    const dto = this.validator.validateAssign(payload);

    const task = await this.repo.findById(taskId, userId);
    if (!task) throw new Error("Task not found");

    task.ensureCanModify();

    return this.repo.assign(taskId, dto.userId, userId);
  }

  async getMyTasks(userId: string) {
    return this.repo.getMyTasks(userId);
  }

  async list(query: any, userId: string) {
    return this.repo.list(query, userId);
  }
}

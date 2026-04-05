import type { IStorageProvider } from "../../../shared/storage/storage.interface";
import type { IattachmentRepository } from "../repositories/attachments.repo";
import type { IattachmentValidator } from "../validators/atatchment.validator";

export class attachmentService {
  constructor(
    private repo: IattachmentRepository,
    private storage: IStorageProvider,
    private validator: IattachmentValidator,
  ) {}

  async upload(taskId: string, file: Express.Multer.File, userId: string) {
    this.validator.validateUpload(file);
    const uploaded = await this.storage.upload(file.buffer, file.originalname);

    const attachment = await this.repo.create({
      taskId,
      userId,
      fileName: file.originalname,
      fileUrl: uploaded.url,
      storageKey: uploaded.key,
    });

    return attachment.toJSON();
  }

  async list(taskId: string, userId: string) {
    const list = await this.repo.findByTask(taskId, userId);
    if (list.length) list[0].ensureMember();

    return list.map((a: any) => a.toJSON());
  }

  async download(id: string, userId: string) {
    const attachment = await this.repo.findById(id, userId);
    if (!attachment) throw new Error("Not found");

    attachment.ensureMember();

    return this.storage.getDownloadUrl(
      (attachment as any).attachment.storageKey,
    );
  }

  async delete(id: string, userId: string) {
    const attachment = await this.repo.findById(id, userId);
    if (!attachment) throw new Error("Not found");

    attachment.ensureOwnerOrAdmin();

    await this.storage.delete((attachment as any).attachment.storageKey);

    await this.repo.delete(id);
  }
}

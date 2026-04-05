import { Request, Response } from "express";
import type { attachmentService } from "../services/attachments.service";

export class attachmentController {
  constructor(private service: attachmentService) {}

  upload = async (req: Request<{ taskId: string }>, res: Response) => {
    const userId = req.user?.id!;
    const taskId = req.params.taskId!;
    const file = req.file!;

    const result = await this.service.upload(taskId, file, userId);

    res.status(201).json({ status: "success", data: result });
  };

  list = async (req: Request<{ taskId: string }>, res: Response) => {
    const result = await this.service.list(req.params.taskId, req.user!.id);
    res.json({ status: "success", data: result });
  };

  download = async (req: Request<{ id: string }>, res: Response) => {
    const url = await this.service.download(req.params.id, req.user!.id);
    res.json({ url });
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    await this.service.delete(req.params.id, req.user!.id);
    res.json({ status: "success" });
  };
}

import { Request, Response } from "express";
import { ValidationError } from "../../../shared/utils/errorHandler";
import { commentService } from "../services/comments.service";

export class commentController {
  constructor(private service: commentService) {}

  create = async (req: Request<{ taskId: string }>, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new ValidationError("unauthorzie , please try login");
    }
    const result = await this.service.create(req.params.taskId, req.body, id);
    res.status(201).json({ status: "success", data: result });
  };

  list = async (req: Request<{ taskId: string }>, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new ValidationError("unauthorzie , please try login");
    }
    const result = await this.service.list(req.params.taskId, id);
    res.status(200).json({ status: "success", data: result });
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new ValidationError("unauthorzie , please try login");
    }
    await this.service.delete(req.params.id, id);
    res.status(200).json({ status: "success" });
  };
}

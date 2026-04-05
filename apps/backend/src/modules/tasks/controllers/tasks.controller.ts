import { Request, Response } from "express";
import { taskService } from "../services/tasks.services";
import { ValidationError } from "../../../shared/utils/errorHandler";

export class taskController {
  constructor(private service: taskService) {}

  create = async (req: Request, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.create(req.body, id);
    res.status(201).json({ status: "success", data: result });
  };

  getTasks = async (req: Request, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.list(req.query, id);
    res.status(200).json({ status: "success", data: result });
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.getById(req.params.id, id);
    res.status(200).json({ status: "success", data: result });
  };

  update = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.update(req.params.id, req.body, id);
    res.status(200).json({ status: "success", data: result });
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    await this.service.delete(req.params.id, id);
    res.status(200).json({ status: "success" });
  };

  updateStatus = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.updateStatus(req.params.id, req.body, id);
    res.status(200).json({ status: "success", data: result });
  };

  assign = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.assign(req.params.id, req.body, id);
    res.status(200).json({ status: "success", data: result });
  };

  getMyTasks = async (req: Request, res: Response) => {
    const id = req.user?.id;

    if (!id) {
      throw new ValidationError("id not found , please try to login again");
    }
    const result = await this.service.getMyTasks(id);
    res.status(200).json({ status: "success", data: result });
  };
}

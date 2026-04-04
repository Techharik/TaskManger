import { Request, Response } from "express";
import { taskService } from "../services/tasks.services";

export class taskController {
  constructor(private service: taskService) {}

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body, req.user.id);
    res.status(201).json({ status: "success", data: result });
  };

  getTasks = async (req: Request, res: Response) => {
    const result = await this.service.list(req.query, req.user.id);
    res.status(200).json({ status: "success", data: result });
  };

  getById = async (req: Request, res: Response) => {
    const result = await this.service.getById(req.params.id, req.user.id);
    res.status(200).json({ status: "success", data: result });
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.update(
      req.params.id,
      req.body,
      req.user.id,
    );
    res.status(200).json({ status: "success", data: result });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id, req.user.id);
    res.status(200).json({ status: "success" });
  };

  updateStatus = async (req: Request, res: Response) => {
    const result = await this.service.updateStatus(
      req.params.id,
      req.body,
      req.user.id,
    );
    res.status(200).json({ status: "success", data: result });
  };

  assign = async (req: Request, res: Response) => {
    const result = await this.service.assign(
      req.params.id,
      req.body,
      req.user.id,
    );
    res.status(200).json({ status: "success", data: result });
  };

  getMyTasks = async (req: Request, res: Response) => {
    const result = await this.service.getMyTasks(req.user.id);
    res.status(200).json({ status: "success", data: result });
  };
}

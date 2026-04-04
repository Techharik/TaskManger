// modules/team/teams.controller.ts

import { ValidationError } from "../../../shared/utils/errorHandler";
import type { teamsService } from "../services/teams.service";
import { Request, Response } from "express";

export class teamsController {
  constructor(private teamsService: teamsService) {}

  create = async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new ValidationError("ID is not found , please login again");
    }
    const result = await this.teamsService.create(req.body, id);
    return res.status(201).json({ status: "success", data: result });
  };

  getMyTeams = async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    const result = await this.teamsService.getMyTeams(id);
    return res.status(200).json({ status: "success", data: result });
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    const paramsid = req.params.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    const result = await this.teamsService.getById(paramsid, id);
    return res.status(200).json({ status: "success", data: result });
  };

  update = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    const paramsid = req.params.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    const result = await this.teamsService.update(paramsid, req.body, id);
    return res.status(200).json({ status: "success", data: result });
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    const paramsid = req.params.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    await this.teamsService.delete(paramsid, id);
    return res.status(200).json({ status: "success" });
  };

  addMember = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    const paramsid = req.params.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    const result = await this.teamsService.addMember(paramsid, req.body, id);
    return res.status(200).json({ status: "success", data: result });
  };

  removeMember = async (
    req: Request<{ id: string; userId: string }>,
    res: Response,
  ) => {
    const project_id = req.params.id;
    const paramsid = req.params.userId;
    const id = req.user?.id;
    if (!project_id || !id) {
      throw new ValidationError("ID is not found, please login again");
    }
    await this.teamsService.removeMember(project_id, paramsid, id);
    return res.status(200).json({ status: "success" });
  };

  getTeamTasks = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.user?.id;
    const paramsid = req.params.id;
    if (!id) {
      throw new ValidationError("ID is not found, please login again");
    }
    const result = await this.teamsService.getTeamTasks(paramsid, id);
    return res.status(200).json({ status: "success", data: result });
  };
}

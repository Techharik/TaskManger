import type { teamsService } from "../services/teams.service";
import { Request, Response } from "express";

export class teamsController {
  constructor(private teamsService: teamsService) {}

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const result = this.teamsService.create(data);
    return res.status(201).json({ status: "success", data: result });
  };
}

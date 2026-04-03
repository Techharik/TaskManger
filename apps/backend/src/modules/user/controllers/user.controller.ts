import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { NotFoundError } from "../../../shared/utils/errorHandler";

export class userController {
  constructor(private userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const result = await this.userService.register(req.body);
    return res.status(201).json({ status: "success", data: result });
  };
  getUserInfo = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params?.id;
    const result = await this.userService.getUser(id);
    return res.status(200).json({ status: "success", data: result });
  };
  deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params?.id;
    const result = await this.userService.deleteUser(id);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  };
}

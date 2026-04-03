import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { NotFoundError } from "../../../shared/utils/errorHandler";

export class userController {
  constructor(private userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const result = await this.userService.register(req.body);
    return res.status(201).json({ status: "success", data: result });
  };
  getUserInfo = async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) throw new NotFoundError("Try login again , user id not found");

    const result = await this.userService.getUser(id);
    return res.status(200).json({ status: "success", data: result });
  };
  deleteUser = async (req: Request, res: Response) => {
    const id = req.user?.id;

    if (!id) throw new NotFoundError("Try login again , user id not found");

    const result = await this.userService.deleteUser(id);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const id = req.user?.id;
    const data = req.body;
    if (!id) throw new NotFoundError("Try login again , user id not found");
    const result = await this.userService.updateUser(id, body);

    return res.status(200).json({ status: "success", data: result });
  };
}

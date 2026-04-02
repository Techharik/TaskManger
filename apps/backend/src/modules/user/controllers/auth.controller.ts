import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class userController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const result = await this.userService.login(req.body);
    res.status(200).json({ status: "success", data: result });
  };
}

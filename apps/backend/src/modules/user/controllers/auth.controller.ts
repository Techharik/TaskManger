import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import type { authService } from "../services/auth.service";

class userController {
  constructor(private authService: authService) {}

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    res.status(200).json({ status: "success", data: result });
  };
}

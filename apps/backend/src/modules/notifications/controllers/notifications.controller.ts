import { Request, Response } from "express";
import { notificationService } from "../services/notifications.services";

function getUserId(req: Request): string {
  if (!req.user?.id) throw new Error("Unauthorized");
  return req.user.id;
}

export class notificationController {
  constructor(private service: notificationService) {}

  list = async (req: Request, res: Response) => {
    const result = await this.service.list(getUserId(req));
    res.json({ status: "success", data: result });
  };

  unreadCount = async (req: Request, res: Response) => {
    const count = await this.service.unreadCount(getUserId(req));
    res.json({ count });
  };

  markAsRead = async (req: Request<{ id: string }>, res: Response) => {
    await this.service.markAsRead(req.params.id, getUserId(req));
    res.json({ status: "success" });
  };

  markAllAsRead = async (req: Request, res: Response) => {
    await this.service.markAllAsRead(getUserId(req));
    res.json({ status: "success" });
  };
}

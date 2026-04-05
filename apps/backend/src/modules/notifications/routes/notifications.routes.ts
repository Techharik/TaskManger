import { Router } from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { notificationController } from "../controllers/notifications.controller";
import { notificationRepositoryImpl } from "../repositories/notifications.repo";
import { notificationService } from "../services/notifications.services";

const router = Router();

const repo = new notificationRepositoryImpl();
const service = new notificationService(repo);
const controller = new notificationController(service);

router.use(authMiddleware);

router.get("/", asyncHandler(controller.list));
router.get("/unread-count", asyncHandler(controller.unreadCount));
router.patch("/:id/read", asyncHandler(controller.markAsRead));
router.patch("/read-all", asyncHandler(controller.markAllAsRead));

export default router;

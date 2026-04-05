// modules/task/task.routes.ts

import { Router } from "express";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

import { taskController } from "../controllers/tasks.controller";
import { taskService } from "../services/tasks.services";
import { taskRepositoryImpl } from "../repositories/tasks.repo";
import { taskValidatorImpl } from "../validators/tasks.validatorsImpl";
import { notificationService } from "../../notifications/services/notifications.services";
import { notificationRepositoryImpl } from "../../notifications/repositories/notifications.repo";

const router = Router();

// DI
const repo = new taskRepositoryImpl();
const validator = new taskValidatorImpl();
const repoNotific = new notificationRepositoryImpl();
const notification = new notificationService(repoNotific);
const service = new taskService(repo, validator, notification);
const controller = new taskController(service);

// auth
router.use(authMiddleware);

router.post("/", asyncHandler(controller.create));
router.get("/", asyncHandler(controller.getTasks));
router.get("/my-tasks", asyncHandler(controller.getMyTasks));
router.get("/:id", asyncHandler(controller.getById));
router.put("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.delete));
router.patch("/:id/status", asyncHandler(controller.updateStatus));
router.patch("/:id/assign", asyncHandler(controller.assign));

export default router;

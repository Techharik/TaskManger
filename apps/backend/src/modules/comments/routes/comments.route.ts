import { Router } from "express";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { commentRepositoryImpl } from "../repositories/comments.repo";
import { commentService } from "../services/comments.service";
import { commentValidatorImpl } from "../validators/comments.validator";
import { commentController } from "../controllers/comments.controller";

const router = Router();

const repo = new commentRepositoryImpl();
const validator = new commentValidatorImpl();
const service = new commentService(repo, validator);
const controller = new commentController(service);

router.use(authMiddleware);

router.post("/:taskId/comments", asyncHandler(controller.create));

router.get("/:taskId/comments", asyncHandler(controller.list));

router.delete("/:taskId/comments/:id", asyncHandler(controller.delete));

export default router;

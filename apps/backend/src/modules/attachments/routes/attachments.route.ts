import { Router } from "express";
import multer from "multer";
import { attachmentController } from "../controllers/attachmenst.controller";
import { localStorageProvider } from "../../../shared/storage/storage";
import { attachmentService } from "../services/attachments.service";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { attachmentRepositoryImpl } from "../repositories/attachments.repo";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

const router = Router();
const upload = multer();

const repo = new attachmentRepositoryImpl();
const storage = new localStorageProvider();
const service = new attachmentService(repo, storage);
const controller = new attachmentController(service);

router.use(authMiddleware);

router.post(
  "/:taskId/attachments",
  upload.single("file"),
  asyncHandler(controller.upload),
);

router.get("/:taskId/attachments", asyncHandler(controller.list));

router.get(
  "/:taskId/attachments/:id/download",
  asyncHandler(controller.download),
);

router.delete("/:taskId/attachments/:id", asyncHandler(controller.delete));

export default router;

import { Router } from "express";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

import { teamsController } from "../controllers/teams.controllers";
import { teamsService } from "../services/teams.service";
import { teamsRepositoryImpl } from "../repositories/teams.repoImpl";
import { teamsValidatorImpl } from "../validators/teams.validatorImpl";

const router = Router();

// DI
const repo = new teamsRepositoryImpl();
const validator = new teamsValidatorImpl();
const service = new teamsService(repo, validator);
const controller = new teamsController(service);

// 🔐 auth
router.use(authMiddleware);

router.post("/", asyncHandler(controller.create));
router.get("/", asyncHandler(controller.getMyTeams));
router.get("/:id", asyncHandler(controller.getById));
router.put("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.delete));
router.post("/:id/members", asyncHandler(controller.addMember));
router.delete("/:id/members/:userId", asyncHandler(controller.removeMember));
router.get("/:id/tasks", asyncHandler(controller.getTeamTasks));

export default router;

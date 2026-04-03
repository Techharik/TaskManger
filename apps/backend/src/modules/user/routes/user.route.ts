import express, { Express, type IRouter } from "express";
import { userValidateImpl } from "../validators/user.validateImpl";
import { userRepoImpl } from "../repositories/userRepoImpl";
import { UserService } from "../services/user.service";
import { userController } from "../controllers/user.controller";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { authController } from "../controllers/auth.controller";
import { authService } from "../services/auth.service";
import { authMiddleware } from "../../../shared/middlewares/auth";

const router: IRouter = express.Router();

// user profile create , update , delete , get

const validator = new userValidateImpl();
const repo = new userRepoImpl();
const service = new UserService(validator, repo);
const controller = new userController(service);
const authSer = new authService(validator, repo);
const authcontrol = new authController(authSer);

router.get("/login", asyncHandler(authcontrol.login));
router.get("/me", authMiddleware, asyncHandler(controller.getUserInfo));
router.post("/", asyncHandler(controller.create));
router.patch("/me", authMiddleware, asyncHandler(controller.updateUser));
// router.patch("/:id/password");
router.delete("/", authMiddleware, asyncHandler(controller.deleteUser));

export default router;

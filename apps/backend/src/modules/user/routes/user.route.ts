import express, { Express, type IRouter } from "express";
import { userValidateImpl } from "../validators/user.validateImpl";
import { userRepoImpl } from "../repositories/userRepoImpl";
import { UserService } from "../services/user.service";
import { userController } from "../controllers/user.controller";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { authController } from "../controllers/auth.controller";
import { authService } from "../services/auth.service";

const router: IRouter = express.Router();

// user profile create , update , delete , get

const validator = new userValidateImpl();
const repo = new userRepoImpl();
const service = new UserService(validator, repo);
const controller = new userController(service);
const authSer = new authService(validator, repo);
const authcontrol = new authController(authSer);
router.get("/login", asyncHandler(authcontrol.login));
router.get("/:id", asyncHandler(controller.getUserInfo));
router.post("/", asyncHandler(controller.create));
// router.patch("/:id");
// router.patch("/:id/password");
router.delete("/:id", asyncHandler(controller.deleteUser));

export default router;

import express, { Express, type IRouter } from "express";

const router: IRouter = express.Router();

// user profile create , update , delete , get

router.get("/");
router.post("/");
router.patch("/:id");
router.patch("/:id/password");
router.delete("/:id");

export default router;

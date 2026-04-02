import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppError } from "./errorHandler";
import { logger } from "../middlewares/logger";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncHandler =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction,
    ) => Promise<any>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      await fn(req as any, res, next);
    } catch (err: any) {
      console.log("Error caught:", err);

      if (err instanceof AppError) {
        logger.error(err.message, { code: err.statusCode });
        return res.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      }

      if (err instanceof SyntaxError) {
        logger.error("Invalid JSON payload", { code: 400 });
        return res.status(400).json({
          status: "fail",
          message: "Invalid JSON payload",
        });
      }

      next(err);
    }
  };

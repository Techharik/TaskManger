import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// import { logger } from "./logger";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(500).json({
    status: "failed",
    messsage: err.message || "Internal Server Error",
  });
};

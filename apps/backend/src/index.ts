import "dotenv/config";
import express, { Express, type Request, type Response } from "express";

export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to basic Task Manger" });
});

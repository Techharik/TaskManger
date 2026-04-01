import "dotenv/config";
import express, { Express, type Request, type Response } from "express";

export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

import "dotenv/config";
import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
});

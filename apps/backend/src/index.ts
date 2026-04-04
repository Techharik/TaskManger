import "dotenv/config";
import express, {
  Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./shared/middlewares/error";
export const app: Express = express();
import userRouter from "./modules/user/routes/user.route";
import teamsRouter from "./modules/teams/routes/teams.route";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Event Management API",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamsRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

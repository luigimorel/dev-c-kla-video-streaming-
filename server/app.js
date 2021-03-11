import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";

const app = express();

app.use("/", userRoutes);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use(compress());
app.use(helmet());

export default app;

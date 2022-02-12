const params = require("strong-params");
import express from "express";
import {
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_STATUS_MESSAGE,
} from "./config/constants";
import { Logger } from "./lib/LoggerImpl";
import { middlewares } from "./middlewares/error.handler";
import { middlewares as staticHandler } from "./middlewares/staticfiles.handler";
import { middlewares as corsHandler } from "./middlewares/cors.handler";
import { routes as apiRoutes } from "./routes/index";
import helmet from "helmet";
import compression from "compression";
const globals = require("globals");
//set base dir
globals.__baseDir = __dirname;

console.log("global", globals.__baseDir);

const app = express();
const logger = new Logger();

app.use(corsHandler.cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());

//serve static files
app.use("/static", staticHandler.handleStaticFiles());

app.use("/api", apiRoutes);
app.get("/health", (req, res) =>
  res.json({ status: true, message: "Health OK!" })
);

app.use(logger.getRequestErrorLogger());

app.use((req, res, next) => {
  const err = new Error(NOT_FOUND_STATUS_MESSAGE);
  res.statusCode = NOT_FOUND_STATUS_CODE;
  res.send(err.message);
});
app.use(middlewares.handleRequestError);
export { app };

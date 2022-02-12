import { Request, Response, Router } from "express";
import expense from "./expense";

const routes = Router();

routes.use("/v1/expense", expense);

export { routes };

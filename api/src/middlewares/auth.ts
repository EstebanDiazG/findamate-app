import config from "../utils/functions/config";
import { NextFunction, Request, Response } from "express";
import createLogger from "../utils/functions/logger";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { apiKey } = config;

  if (req.headers.duoc !== apiKey.toString()) {
    createLogger.error("Incorrect api key");
    res.status(401).json({ message: "Incorrect api key" });
    return;
  }

  return next();
};

export default auth;

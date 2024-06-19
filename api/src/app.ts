import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import { setSecurityHeaders } from "./middlewares/setSecurityHeaders";
import handlerResponse from "./middlewares/handlerResponse";
import handlerRequest from "./middlewares/handlerRequest";
import handlerError from "./middlewares/handlerError";
import auth from "./middlewares/auth";
import { allowedOrigins } from "./middlewares/allowedOrigins";
import createLogger from "./utils/functions/logger";
import pool from "./utils/lib/pg";
import * as routes from "./routes";

const app = express();

const corsOptions = {
  preflightContinue: false,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    console.log("Origin:", origin);
    if (process.env.ENV === "dev") {
      callback(null, true);
    } else {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        createLogger.error({
          controller: "CORS",
          error: "Not allowed by CORS, origin: " + origin,
        });
        callback(null, false);
      }
    }
  },
  credentials: true,
};

const routeMappings = [
  { path: "/profile", router: routes.profileRoutes },
  { path: "/interest", router: routes.interestRoutes },
  { path: "/categoryInterest", router: routes.categoryInterestRoutes },
  { path: "/person", router: routes.personRoutes },
  { path: "/user", router: routes.userRoutes },
  { path: "/rol", router: routes.rolRoutes },
  { path: "/action", router: routes.actionRoutes },
  { path: "/image", router: routes.imageRoutes },
  { path: "/study-group", router: routes.studyGroupRoutes },
  { path: "/video", router: routes.videoRoutes },
  { path: "/file", router: routes.fileRoutes },
  { path: "/topic", router: routes.topicRoutes },
  { path: "/message_topic", router: routes.messageTopicRoutes },
  { path: "/media", router: routes.mediaRoutes },
];

function initializeRoutes(app: Express) {
  routeMappings.forEach((route) => {
    app.use(route.path, route.router, handlerError);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      return res.status(400).json({ error: "Json Request Format is invalid" });
    }

    return res.status(500).json({ error: "Internal server error" });
  });

  const virtualPath = "/public";
  const diskPath = path.join(__dirname, "..", "public");
  app.use(virtualPath, express.static(diskPath));
}

const imagesUploadDir = path.join(__dirname, "../public/uploads/images");
app.use("/uploads/images", express.static(imagesUploadDir));

const mediaUploadDir = path.join(__dirname, "../public/uploads/media");
app.use("/uploads/media", express.static(mediaUploadDir));

pool.connect((err) => {
  if (err) {
    console.log(`Failed to connect db`, err.stack);
    return process.exit(1);
  }
  console.log("Successful database connection");
});

app.use(setSecurityHeaders);
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" as const },
    frameguard: { action: "sameorigin" as const },
    noSniff: true,
    hsts: { maxAge: 31536000, includeSubDomains: true },
  })
);
app.use(handlerRequest);
//app.use(auth);

initializeRoutes(app);

app.use(handlerError);
app.use(handlerResponse);

export default app;

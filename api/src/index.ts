import express from "express";
import pool from "./utils/lib/pg";
import cors from "cors";
import { apiPort } from "./utils/functions/config";

import handlerResponse from "./middlewares/handlerResponse";
import handlerRequest from "./middlewares/handlerRequest";
import handlerError from "./middlewares/handlerError";

import personRoutes from "./routes/person";
import userRoutes from "./routes/user";
import rolRoutes from "./routes/rol";
import actionRoutes from "./routes/action";
import imageRoutes from "./routes/image";
import studyGroupRoutes from "./routes/studyGroup";

//database
pool.connect((err) => {
  if (err) {
    console.log(`Failed to connect db`, err.stack);
    return process.exit(1);
  }
  console.log("Successful database connection");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(handlerRequest);

//enrutamiento
app.use("/person", personRoutes);
app.use("/user", userRoutes);
app.use("/rol", rolRoutes);
app.use("/action", actionRoutes);
app.use("/image", imageRoutes);
app.use("/study-group", studyGroupRoutes);

app.use(handlerError);
app.use(handlerResponse);
app.listen(apiPort, () => {
  console.log(`🚀API listening port ${apiPort}`);
});

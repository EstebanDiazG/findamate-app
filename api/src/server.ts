import createLogger from "./utils/functions/logger";
import config from "./utils/functions/config";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
createLogger.info(`🚀API listening port ${apiPort}`);

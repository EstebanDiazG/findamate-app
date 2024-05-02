"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("./utils/lib/pg"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utils/functions/config");
const handlerResponse_1 = __importDefault(require("./middlewares/handlerResponse"));
const handlerRequest_1 = __importDefault(require("./middlewares/handlerRequest"));
const handlerError_1 = __importDefault(require("./middlewares/handlerError"));
const person_1 = __importDefault(require("./routes/person"));
pg_1.default.connect((err) => {
    if (err) {
        console.log(`Failed to connect db`, err.stack);
        return process.exit(1);
    }
    console.log('Successful database connection');
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(handlerRequest_1.default);
app.use('/person', person_1.default);
app.use(handlerError_1.default);
app.use(handlerResponse_1.default);
app.listen(config_1.apiPort, () => {
    console.log(`🚀API listening port ${config_1.apiPort}`);
});

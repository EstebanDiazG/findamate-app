"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const setSecurityHeaders_1 = require("./middlewares/setSecurityHeaders");
const handlerResponse_1 = __importDefault(require("./middlewares/handlerResponse"));
const handlerRequest_1 = __importDefault(require("./middlewares/handlerRequest"));
const handlerError_1 = __importDefault(require("./middlewares/handlerError"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const allowedOrigins_1 = require("./middlewares/allowedOrigins");
const logger_1 = __importDefault(require("./utils/functions/logger"));
const pg_1 = __importDefault(require("./utils/lib/pg"));
const routes = __importStar(require("./routes"));
const corsOptions = {
    preflightContinue: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: (origin, callback) => {
        if (process.env.ENV !== "dev") {
            if (!origin || allowedOrigins_1.allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                logger_1.default.error({
                    controller: "CORS",
                    error: "Not allowed by CORS, origin: " + origin,
                });
                callback(null, false);
            }
        }
        else {
            callback(null, true);
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
];
function initializeRoutes(server) {
    routeMappings.forEach((route) => {
        server.use(route.path, route.router);
    });
    server.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.message.includes("JSON")) {
            return res.status(400).json({ error: "Json Request Format is invalid" });
        }
        return res.status(500).json({ error: "Internal server error" });
    });
    const virtualPath = "/public";
    const diskPath = path_1.default.join(__dirname, "..", "public");
    server.use(virtualPath, express_1.default.static(diskPath));
}
pg_1.default.connect((err) => {
    if (err) {
        console.log(`Failed to connect db`, err.stack);
        return process.exit(1);
    }
    console.log("Successful database connection");
});
const server = (0, express_1.default)();
server.use(setSecurityHeaders_1.setSecurityHeaders);
server.use(express_1.default.json());
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.urlencoded({ extended: false }));
server.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        },
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    frameguard: { action: "sameorigin" },
    noSniff: true,
    hsts: { maxAge: 31536000, includeSubDomains: true },
}));
server.use(handlerRequest_1.default);
server.use(auth_1.default);
initializeRoutes(server);
server.use(handlerError_1.default);
server.use(handlerResponse_1.default);
exports.default = server;

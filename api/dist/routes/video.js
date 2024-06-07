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
const express_1 = require("express");
const Video = __importStar(require("../controllers/video"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const videoRoutes = (0, express_1.Router)();
videoRoutes.get("/", auth_1.default, Video.getAll);
videoRoutes.get("/id/:id", auth_1.default, Video.getById);
videoRoutes.get("/personId/:idPerson", auth_1.default, Video.getByPerson);
videoRoutes.post("/", auth_1.default, Video.upsert);
videoRoutes.delete("/id/:id", auth_1.default, Video.deleteById);
videoRoutes.put("/like/:idPerson", auth_1.default, Video.likeVideo);
videoRoutes.delete("/dislike/:idPerson", auth_1.default, Video.removeLike);
videoRoutes.put("/comment/:idPerson", auth_1.default, Video.giveComment);
videoRoutes.delete("/comment/:idPerson", auth_1.default, Video.removeComment);
exports.default = videoRoutes;

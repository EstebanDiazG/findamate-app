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
const Topic = __importStar(require("../controllers/topic"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const topicRoutes = (0, express_1.Router)();
topicRoutes.get("/", auth_1.default, Topic.getAll);
topicRoutes.get("/id/:id", auth_1.default, Topic.getById);
topicRoutes.get("/idPerson/:id_person", auth_1.default, Topic.getByIdPerson);
topicRoutes.post("/", auth_1.default, Topic.upsert);
topicRoutes.put("/id/:id", auth_1.default, Topic.update);
topicRoutes.delete("/id/:id", auth_1.default, Topic.deleteById);
exports.default = topicRoutes;

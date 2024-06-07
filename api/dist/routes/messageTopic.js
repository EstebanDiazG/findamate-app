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
const MessageTopic = __importStar(require("../controllers/messageTopic"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const messageTopicRoutes = (0, express_1.Router)();
messageTopicRoutes.get("/", auth_1.default, MessageTopic.getAll);
messageTopicRoutes.get("/id/:id", auth_1.default, MessageTopic.getById);
messageTopicRoutes.get("/idPerson/:id_person", auth_1.default, MessageTopic.getByIdPerson);
messageTopicRoutes.get("/idTopic/:id_topic", auth_1.default, MessageTopic.getByIdTopic);
messageTopicRoutes.post("/", auth_1.default, MessageTopic.createMessage);
messageTopicRoutes.put("/id/:id", auth_1.default, MessageTopic.update);
messageTopicRoutes.delete("/id/:id", auth_1.default, MessageTopic.deleteById);
exports.default = messageTopicRoutes;

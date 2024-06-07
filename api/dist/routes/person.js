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
const Person = __importStar(require("../controllers/person"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const personRoutes = (0, express_1.Router)();
personRoutes.get("/", auth_1.default, Person.getAll);
personRoutes.get("/id/:id", auth_1.default, Person.getById);
personRoutes.get("/rut/:rut", auth_1.default, Person.getByRut);
personRoutes.post("/", auth_1.default, Person.upsert);
personRoutes.delete("/id/:id", auth_1.default, Person.deleteById);
personRoutes.put("/personId/:personId", auth_1.default, Person.assignPerson);
personRoutes.delete("/personId/:personId", auth_1.default, Person.removePerson);
personRoutes.put("/personId/interest/:id_person", auth_1.default, Person.assignInterest);
personRoutes.delete("/personId/removeInterest/:id_person", auth_1.default, Person.removeInterest);
personRoutes.get("/personId/getPerson/:id_person", auth_1.default, Person.getInterestsByPersonId);
exports.default = personRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Person {
    constructor(id, rut, name, paternalLastName, maternalLastName, sede_id) {
        this.id = id;
        this.rut = rut;
        this.name = name;
        this.paternalLastName = paternalLastName;
        this.maternalLastName = maternalLastName;
        this.sede_id = sede_id;
    }
}
_a = Person;
Person.getAll = async () => {
    const query = await pg_1.default.query(`   
    SELECT id, rut, name, paternal_lastname, maternal_lastname, sede_id
    FROM app.person 
     `);
    return query.rows || [];
};
exports.default = Person;

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
    SELECT
        per.id,
        per.rut, 
        per.name, 
        per.paternal_lastname, 
        per.maternal_lastname, 
        sed.name AS "comuna"
    FROM app.person per
    LEFT JOIN 
        app.sede sed ON per.sede_id = sed.id
    WHERE per.deleted_at IS NULL`);
    return query.rows || [];
};
Person.getById = async (id) => {
    const query = await pg_1.default.query(`SELECT
            per.id,
            per.rut, 
            per.name, 
            per.paternal_lastname, 
            per.maternal_lastname, 
            sed.name AS "comuna"
        FROM app.person per
        LEFT JOIN 
            app.sede sed ON per.sede_id = sed.id
        WHERE per.id = $1 AND per.deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
exports.default = Person;

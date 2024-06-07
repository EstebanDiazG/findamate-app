"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Person {
    constructor(id, rut, name, paternalLastName, maternalLastName, email) {
        this.id = id;
        this.rut = rut;
        this.name = name;
        this.paternalLastName = paternalLastName;
        this.maternalLastName = maternalLastName;
        this.email = email;
    }
}
_a = Person;
Person.getAll = async () => {
    const query = await pg_1.default.query(` SELECT
        id,
        rut, 
        name, 
        paternal_lastname AS "paternalLastName", 
        maternal_lastname AS "maternalLastName",
        email
    FROM app.person
    WHERE deleted_at IS NULL`);
    return query.rows || [];
};
Person.getById = async (id) => {
    const query = await pg_1.default.query(`SELECT
            id,
            rut, 
            name, 
            paternal_lastname AS "paternalLastName", 
            maternal_lastname AS "maternalLastName",
            email,
            created_at AS "createdAt",
            updated_at AS "updatedAt",            
            deleted_at AS "deletedAt"           
        FROM app.person
        WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
Person.getByRut = async (rut) => {
    const query = await pg_1.default.query(`SELECT
          id,
          rut, 
          name, 
          paternal_lastname AS "paternalLastName", 
          maternal_lastname AS "maternalLastName",
          email,
          created_at AS "createdAt",
          updated_at AS "updatedAt",            
          deleted_at AS "deletedAt"  
        FROM app.person
        WHERE rut = $1 AND deleted_at IS NULL`, [rut]);
    return query.rowCount ? query.rows[0] : null;
};
Person.upsert = async (rut, name, paternalLastName, maternalLastName, email) => {
    const response = await pg_1.default.query(`
        WITH person_data AS (
          INSERT INTO app.person (rut, name, paternal_lastname, maternal_lastname, email) 
            VALUES ($1, $2, $3, $4, $5) 
            ON CONFLICT (rut)
            DO UPDATE SET name = $2, paternal_lastname = $3, maternal_lastname = $4, email = $5, updated_at = now()
            RETURNING *
        )
          SELECT 
          id, 
          rut, 
          name,
          paternal_lastname AS "paternalLastName",
          maternal_lastname AS "maternalLastName", 
          email,
          created_at AS "createdAt",
          updated_at AS "updatedAt"        
        FROM 
        person_data`, [rut, name, paternalLastName, maternalLastName, email]);
    return response.rowCount ? response.rows[0] : null;
};
Person.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.person 
             SET deleted_at = now()
             WHERE id = $1
             RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = Person;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Profile {
    constructor(id, id_person, id_imagen, description) {
        this.id = id;
        this.id_person = id_person;
        this.id_imagen = id_imagen;
        this.description = description;
    }
}
_a = Profile;
Profile.getAll = async () => {
    const query = await pg_1.default.query(`   
        SELECT
            pro.id,
            per.id AS "personId", 
            per.name AS "name", 
            per.paternal_lastname AS "paternalLastName", 
            per.maternal_lastname AS "maternalLastName",
            us.hash AS "password",
            pro.description,
            img.id AS "id_imagen"
        FROM app.profile pro
        LEFT JOIN 
            app.person per ON per.id = pro.id_person
        LEFT JOIN
            app.user us ON per.id = us.person_id
        LEFT JOIN
            app.image img ON pro.id_imagen = img.id
        WHERE pro.deleted_at IS NULL`);
    return query.rows || [];
};
Profile.getById = async (id) => {
    const query = await pg_1.default.query(`   
            SELECT
                pro.id,
                per.id AS "personId", 
                per.name AS "name", 
                per.paternal_lastname AS "paternalLastName",
                per.maternal_lastname AS "maternalLastName",
                pro.description,
                img.id AS "id_imagen"
            FROM app.profile pro
            LEFT JOIN 
                app.person per ON per.id = pro.id_person
            LEFT JOIN
                app.user us ON per.id = us.person_id
            LEFT JOIN
                app.image img ON pro.id_imagen = img.id
            WHERE pro.id = $1 AND pro.deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
Profile.getByIdPerson = async (id_person) => {
    const query = await pg_1.default.query(`   
            SELECT
                pro.id,
                per.id AS "personId", 
                per.name AS "name", 
                per.paternal_lastname AS "paternalLastName", 
                per.maternal_lastname AS "maternalLastName",
                pro.description,
                img.id AS "id_imagen"
            FROM app.profile pro
            LEFT JOIN 
                app.person per ON per.id = pro.id_person
            LEFT JOIN
                app.user us ON per.id = us.person_id
            LEFT JOIN
                app.image img ON pro.id_imagen = img.id
            WHERE pro.id_person = $1 AND pro.deleted_at IS NULL`, [id_person]);
    return query.rowCount ? query.rows[0] : null;
};
Profile.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.profile 
                     SET deleted_at = now()
                     WHERE id = $1
                     RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
Profile.update = async (id, description, name, paternalLastName, maternalLastName) => {
    const response = await pg_1.default.query(`WITH updated_profile AS (
        UPDATE app.profile 
        SET description = $2
        WHERE id = $1
        RETURNING id, description, id_person
      ), updated_person AS (
        UPDATE app.person 
        SET name = $3, paternal_lastname = $4, maternal_lastname = $5
        WHERE id = (SELECT id_person FROM updated_profile)
        RETURNING id ,name, paternal_lastname, maternal_lastname
      )
      SELECT updated_profile.id, updated_person.id AS "personId" , updated_profile.description, updated_person.name AS "name", updated_person.paternal_lastname, updated_person.maternal_lastname FROM updated_profile, updated_person`, [id, description, name, paternalLastName, maternalLastName]);
    return response.rows[0] || null;
};
exports.default = Profile;

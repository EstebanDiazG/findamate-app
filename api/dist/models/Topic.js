"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Topic {
    constructor(id, id_person, content, id_interest) {
        this.id = id;
        this.id_person = id_person;
        this.content = content;
        this.id_interest = id_interest;
    }
}
_a = Topic;
Topic.getAll = async () => {
    const query = await pg_1.default.query(`   
        SELECT
            tpc.id,
            tpc.id_person,
            tpc.title,
            tpc.content,
            per.name AS "creadorTopico",
            int.name AS "Interest",
            cat.name AS "categoryInterest"
        FROM app.topics tpc
        LEFT JOIN
            app.person per ON per.id = tpc.id_person
        LEFT JOIN
            app.interest int ON int.id = tpc.id_interest
        LEFT JOIN
            app.category_interest cat ON int.id = cat.id_interest
        WHERE tpc.deleted_at IS NULL`);
    return query.rows || [];
};
Topic.getById = async (id) => {
    try {
        const query = await pg_1.default.query(`
          SELECT
              tpc.id,
              tpc.id_person,
              tpc.title,
              tpc.content,
              per.name AS "creadorTopico",
              int.name AS "Interest",
              cat.name AS "categoryInterest"
          FROM app.topics tpc
          LEFT JOIN
              app.person per ON per.id = tpc.id_person
          LEFT JOIN
              app.interest int ON int.id = tpc.id_interest
          LEFT JOIN
              app.category_interest cat ON int.id = cat.id_interest
          WHERE tpc.id = $1 AND tpc.deleted_at IS NULL`, [id]);
        return query.rowCount ? query.rows[0] : null;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
Topic.getByIdPerson = async (id_person) => {
    const query = await pg_1.default.query(`
        SELECT
            tpc.id,
            tpc.id_person,
            tpc.title,
            tpc.content,
            per.name AS "creadorTopico",
            int.name AS "Interest",
            cat.name AS "categoryInterest"
        FROM app.topics tpc
        LEFT JOIN
            app.person per ON per.id = tpc.id_person
        LEFT JOIN
            app.interest int ON int.id = tpc.id_interest
        LEFT JOIN
            app.category_interest cat ON int.id = cat.id_interest
        WHERE tpc.id_person = $1 AND tpc.deleted_at IS NULL`, [id_person]);
    return query.rows || [];
};
Topic.upsert = async (id_person, title, content, id_interest) => {
    const response = await pg_1.default.query(`
        INSERT INTO app.topics (id_person, title, content, id_interest) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [id_person, title, content, id_interest]);
    return response.rowCount ? response.rows[0] : null;
};
Topic.update = async (id, content) => {
    const response = await pg_1.default.query(`UPDATE app.topics 
            SET content = $2 , updated_at = now()
            WHERE id = $1
            RETURNING content AS "contenido"`, [id, content]);
    return response.rows[0] || null;
};
Topic.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.topics 
                     SET deleted_at = now()
                     WHERE id = $1
                     RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = Topic;

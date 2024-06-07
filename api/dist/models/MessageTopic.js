"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class MessageTopic {
    constructor(id_person, id_topic, content) {
        this.id_person = id_person;
        this.id_topic = id_topic;
        this.content = content;
    }
}
_a = MessageTopic;
MessageTopic.getAll = async () => {
    const query = await pg_1.default.query(`   
        SELECT
            mtpc.id,
            mtpc.content AS "mensaje",
            per.name AS "Creador mensaje"
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.delete_at IS NULL`);
    return query.rows || [];
};
MessageTopic.getById = async (id) => {
    const query = await pg_1.default.query(`
        SELECT
            mtpc.id,
            mtpc.content AS "mensaje",
            per.name AS "Creador mensaje"
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id = $1 AND mtpc.delete_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
MessageTopic.getByIdPerson = async (id_person) => {
    const query = await pg_1.default.query(`
        SELECT
            mtpc.id,
            mtpc.content AS "mensaje",
            per.name AS "Creador mensaje"
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id_person = $1 AND mtpc.delete_at IS NULL`, [id_person]);
    return query.rows || [];
};
MessageTopic.getByIdTopic = async (id_topic) => {
    const query = await pg_1.default.query(`
        SELECT
            mtpc.id,
            mtpc.content AS "mensaje",
            per.name AS "Creador mensaje"
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id_topic = $1 AND mtpc.delete_at IS NULL`, [id_topic]);
    return query.rows || [];
};
MessageTopic.createMessage = async (id_person, id_topic, content) => {
    const response = await pg_1.default.query(`
            INSERT INTO app.message_topic (id_person, id_topic, content) 
            VALUES ($1, $2, $3)
            RETURNING *;
          `, [id_person, id_topic, content]);
    return response.rowCount ? response.rows[0] : null;
};
MessageTopic.update = async (id, content) => {
    const response = await pg_1.default.query(`UPDATE app.message_topic 
            SET content = $2 , updated_at = now()
            WHERE id = $1
            RETURNING content AS "contenido"`, [id, content]);
    return response.rows[0] || null;
};
MessageTopic.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.message_topic 
                     SET delete_at = now()
                     WHERE id = $1
                     RETURNING id, delete_at AS "deleteAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = MessageTopic;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class StudyGroup {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}
_a = StudyGroup;
StudyGroup.getAll = async () => {
    const query = await pg_1.default.query(`SELECT
            name,
            description,
            type
        FROM app.study_group
        WHERE deleted_at IS NULL`);
    return query.rows || [];
};
StudyGroup.getById = async (id) => {
    const query = await pg_1.default.query(`SELECT
            name,
            description,
            type,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt"
        FROM app.study_group
        WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
StudyGroup.upsert = async (name, description, type) => {
    const query = await pg_1.default.query(`INSERT INTO app.study_group (name, description, type)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO UPDATE
        SET description = $2, type = $3, updated_at = now()
        RETURNING name`, [name, description, type]);
    return query.rows[0];
};
StudyGroup.delete = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.study_group
        SET deleted_at = now()
        WHERE id = $1
        RETURNING id, deleted_at AS "deletedAt"`, [id]);
    console.log("Response from query:", response);
    return response.rows[0] || null;
};
exports.default = StudyGroup;

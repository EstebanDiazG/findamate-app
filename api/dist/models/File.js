"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/functions/config");
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Files {
    constructor() { }
    static async search(query) {
        const response = await pg_1.default.query(`SELECT file.id, '${config_1.filesUploadUrl}/' || file.internal_name AS url, count(*) over() AS total FROM app.file WHERE $3::int2 is null OR status_code = $3 ORDER BY created_at DESC LIMIT $2 OFFSET ($1 - 1) * $2;`, [query.page, query.limit, query.statusCode]);
        return response.rows;
    }
    static async create(file) {
        const response = await pg_1.default.query("INSERT INTO app.file(original_name, internal_name, mimetype, format, size, path, encoding) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id;", [
            file.originalname || null,
            file.internalname || null,
            file.mimetype || null,
            file.format || null,
            file.size || null,
            file.path || null,
            file.encoding || null,
        ]);
        return response.rows[0]?.id;
    }
    static async updateById(id, file) {
        const response = await pg_1.default.query("UPDATE app.file SET originalname = COALESCE($2, originalname), internalname = COALESCE($3, internalname), mimetype = COALESCE($4, mimetype), format = COALESCE($5, format), size = COALESCE($6, size), path = COALESCE($7, path), encoding = COALESCE($8, encoding) WHERE id = $1 RETURNING id;", [
            id,
            file.originalname || null,
            file.internalname || null,
            file.mimetype || null,
            file.format || null,
            file.size || null,
            file.path || null,
            file.encoding || null,
        ]);
        return response.rows[0]?.id;
    }
    static async getById(id) {
        const response = await pg_1.default.query(`SELECT id, original_name, internal_name, mimetype, format, size, path, encoding, '${config_1.filesUploadUrl}/' || internal_name AS url FROM app.file WHERE id = $1;`, [id]);
        return response.rows[0];
    }
    static async deleteById(id) {
        const response = await pg_1.default.query("DELETE FROM app.file WHERE id = $1 RETURNING id;", [id]);
        return response.rowCount ? response.rows[0].id : null;
    }
}
exports.default = Files;

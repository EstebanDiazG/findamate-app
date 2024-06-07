"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/functions/config");
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Images {
    constructor() { }
    static async search(query) {
        const response = await pg_1.default.query(`SELECT img.id, '${config_1.imagesUploadUrl}/' || img.id || '.jpg' AS url, count(*) over() AS total FROM app.image img WHERE $3::int2 is null OR status_code = $3 ORDER BY created_at DESC LIMIT $2 OFFSET ($1 - 1) * $2;`, [query.page, query.limit, query.statusCode]);
        return response.rows;
    }
    static async create(image) {
        const response = await pg_1.default.query("INSERT INTO app.image(fieldname, originalname, encoding, mimetype, format, width, height, size) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;", [
            image.fieldname || null,
            image.originalname || null,
            image.encoding || null,
            image.mimetype || null,
            image.format || null,
            image.width || null,
            image.height || null,
            image.size || null,
        ]);
        return response.rows[0]?.id;
    }
    static async updateById(id, image) {
        const response = await pg_1.default.query("UPDATE app.image SET fieldname = COALESCE($2, fieldname), originalname = COALESCE($3, originalname), encoding = COALESCE($4, encoding), mimetype = COALESCE($5, mimetype), format = COALESCE($6, format), width = COALESCE($7, width), height = COALESCE($8, height),  size = COALESCE($9, size) WHERE id = $1 RETURNING id;", [
            id,
            image.fieldname || null,
            image.originalname || null,
            image.encoding || null,
            image.mimetype || null,
            image.format || null,
            image.width || null,
            image.height || null,
            image.size || null,
        ]);
        return response.rows[0]?.id;
    }
    static async getById(id) {
        const response = await pg_1.default.query(`SELECT id, fieldname, originalname, encoding, mimetype, format, width, height, size, '${config_1.imagesUploadUrl}/' || id || '.jpg' AS url
            FROM app.image
            WHERE id = $1`, [id]);
        return response.rowCount ? response.rows[0] : null;
    }
    static async deleteById(id) {
        const response = await pg_1.default.query(`DELETE FROM app.image WHERE id = $1 RETURNING id`, [id]);
        return response.rowCount ? response.rows[0].id : null;
    }
}
exports.default = Images;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Interest {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
_a = Interest;
Interest.getAll = async () => {
    const query = await pg_1.default.query(`   
        SELECT
            id,
            name
        FROM app.interest
        WHERE deleted_at IS NULL`);
    return query.rows || [];
};
Interest.getById = async (id) => {
    const query = await pg_1.default.query(`SELECT
                id, 
                name
            FROM app.interest
            WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
Interest.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.interest 
                 SET deleted_at = now()
                 WHERE id = $1
                 RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = Interest;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class CategoryInterest {
    constructor(id, name, id_interest) {
        this.id = id;
        this.name = name;
        this.id_interest = id_interest;
    }
}
_a = CategoryInterest;
CategoryInterest.getAll = async () => {
    const query = await pg_1.default.query(`   
        SELECT
            ci.id,
            ci.name,
            int.name AS "interes"
        FROM app.category_interest ci
        LEFT JOIN
            app.interest int ON int.id = ci.id_interest
        WHERE ci.deleted_at IS NULL`);
    return query.rows || [];
};
CategoryInterest.getById = async (id) => {
    const query = await pg_1.default.query(`SELECT
            ci.id,
            ci.name,
            int.name AS "interes"
        FROM app.category_interest ci
        LEFT JOIN
            app.interest int ON int.id = ci.id_interest
        WHERE ci.id = $1 AND ci.deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
CategoryInterest.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.category_interest 
                 SET deleted_at = now()
                 WHERE id = $1
                 RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = CategoryInterest;

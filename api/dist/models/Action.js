"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Action {
    constructor(id, code, description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }
}
_a = Action;
Action.getAll = async () => {
    const query = await pg_1.default.query(` SELECT 
            id,
            code, 
            description    
          FROM 
              app.action
          WHERE 
              deleted_at IS NULL`);
    return query.rows || [];
};
Action.getById = async (id) => {
    const query = await pg_1.default.query(` SELECT 
            id,
            code, 
            description,
            created_at AS "createdAt",
            updated_at AS "updatedAt"   
        FROM 
            app.action
        WHERE  
            id = $1 AND deleted_at IS NULL`, [id]);
    return query.rowCount ? query.rows[0] : null;
};
Action.getByCode = async (code) => {
    const query = await pg_1.default.query(` SELECT 
            id,
            code, 
            description,
            created_at AS "createdAt",
            updated_at AS "updatedAt"   
        FROM 
            app.action
        WHERE  
            code = $1 AND deleted_at IS NULL`, [code]);
    return query.rowCount ? query.rows[0] : null;
};
Action.upsert = async (code, description) => {
    const response = await pg_1.default.query(`
        WITH action_data AS (
          INSERT INTO app.action (code, description) 
            VALUES ($1, $2) 
            ON CONFLICT (code)
            DO UPDATE SET description = $2, updated_at = now()
            RETURNING *
        )
        SELECT 
            act.id,
            act.code,
            act.description, 
            act.created_at AS "createdAt",
            act.updated_at AS "updatedAt"     
        FROM 
            action_data act`, [code, description]);
    return response.rowCount ? response.rows[0] : null;
};
Action.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.action 
             SET deleted_at = now()
             WHERE id = $1
             RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = Action;

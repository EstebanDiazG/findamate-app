"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Rol {
    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
_a = Rol;
Rol.getAll = async () => {
    const query = await pg_1.default.query(` SELECT id, code, name  
      FROM app.rol 
      WHERE deleted_at IS NULL
      ORDER BY name`);
    return query.rows;
};
Rol.getById = async (id) => {
    const response = await pg_1.default.query(` SELECT 
            id,
            code,
            name,
            ARRAY(
                SELECT 
                  json_build_object(
                    'id', act.id,
                    'code', act.code,
                    'description', act.description
                  )
                FROM 
                    app.rol_action AS rac
                INNER JOIN app.action act ON rac.action_id = act.id 
                WHERE 
                    rol_id = rol.id
            ) AS actions,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
        FROM 
            app.rol 
        WHERE 
            id = $1;
        `, [id]);
    return response.rowCount ? response.rows[0] : null;
};
Rol.upsert = async (code, name) => {
    const response = await pg_1.default.query(`INSERT INTO app.rol (code, name) 
        VALUES ($1, $2) 
        ON CONFLICT (code)
        DO UPDATE SET name = $2, updated_at = now()
        RETURNING 
          id,
          code, 
          name,
          ARRAY(
                SELECT 
                  json_build_object(
                    'id', act.id,
                    'code', act.code,
                    'description', act.description
                  )
                FROM 
                    app.rol_action AS rac
                INNER JOIN app.action act ON rac.action_id = act.id 
                WHERE 
                    rol_id = rol.id
            ) AS actions, 
          created_at AS "createdAt", 
          updated_at AS "updatedAt"`, [code, name]);
    return response.rowCount ? response.rows[0] : null;
};
Rol.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.rol 
         SET deleted_at = Now()
         WHERE id = $1
         RETURNING id, deleted_at AS "deletedAt" `, [id]);
    return response.rows[0] || null;
};
exports.default = Rol;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class RolAction {
    constructor(actionId, RolId) {
        this.actionId = actionId;
        this.RolId = RolId;
    }
}
_a = RolAction;
RolAction.assignAction = async (rolId, actionId) => {
    const response = await pg_1.default.query(`WITH updated_rol_action AS (
        INSERT INTO app.rol_action (rol_id, action_id)
        VALUES ($1, $2)
        ON CONFLICT (rol_id, action_id) 
        DO UPDATE SET updated_at = now()
        RETURNING *
    ),
    actions AS (
        SELECT 
            rac.rol_id,
            json_build_object(
                'id', act.id,
                'code', act.code,
                'description', act.description
            ) AS action
        FROM 
            updated_rol_action AS rac
        LEFT JOIN app.action act ON rac.action_id = act.id 
        WHERE 
            rac.rol_id = $1
    )
    SELECT 
        rol.id,
        rol.code, 
        rol.name,
        json_agg(actions.action) AS actions,
        rac.created_at AS "createdAt", 
        rac.updated_at AS "updatedAt"
    FROM 
        app.rol AS rol
    LEFT JOIN 
        updated_rol_action rac ON rol.id = rac.rol_id
    LEFT JOIN
        actions ON rol.id = actions.rol_id
    WHERE 
        rol.id = $1
    GROUP BY 
        rol.id,
        rol.code,
        rol.name,
        rac.created_at,
        rac.updated_at;
    `, [rolId, actionId]);
    return response.rowCount ? response.rows[0] : null;
};
RolAction.removeAction = async (rolId, actionId) => {
    const response = await pg_1.default.query(`WITH updated_rol_action AS (
        UPDATE app.rol_action 
         SET deleted_at = now()
         WHERE rol_id = $1
         AND action_id = $2
         RETURNING *
         )
         SELECT 
          rol.id,
          rol.code, 
          rol.name,
          (
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
                rac.rol_id = rol.id
        ) AS actions,
         
          rac.created_at AS "createdAt", 
          rac.updated_at AS "updatedAt"
        FROM app.rol AS rol
        INNER JOIN app.rol_action rac ON rol.id = rac.rol_id
        INNER JOIN app.action act ON rac.action_id = act.id
        WHERE rol.id = $1
         `, [rolId, actionId]);
    return response.rows[0] || null;
};
exports.default = RolAction;

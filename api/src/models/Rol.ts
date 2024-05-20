import connection from "../utils/lib/pg";

class Rol {
  id: string;
  code: string;
  name: string;

  constructor(id: string, code: string, name: string) {
    this.id = id;
    this.code = code;
    this.name = name;
  }

  static getAll = async (): Promise<Array<Rol>> => {
    const query = await connection.query(
      ` SELECT id, code, name  
      FROM app.rol 
      WHERE deleted_at IS NULL
      ORDER BY name`
    );
    return query.rows;
  };

  static getById = async (id: string): Promise<Rol | null> => {
    const response = await connection.query(
      ` SELECT 
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
        `,
      [id]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static upsert = async (code: string, name: string): Promise<Rol | null> => {
    const response = await connection.query(
      `INSERT INTO app.rol (code, name) 
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
          updated_at AS "updatedAt"`,
      [code, name]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static deleteById = async (id: string): Promise<Rol | null> => {
    const response = await connection.query(
      `UPDATE app.rol 
         SET deleted_at = Now()
         WHERE id = $1
         RETURNING id, deleted_at AS "deletedAt" `,
      [id]
    );
    return response.rows[0] || null;
  };
}

export default Rol;

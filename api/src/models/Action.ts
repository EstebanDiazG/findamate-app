import connection from "../utils/lib/pg";

class Action {
  id: string;
  code: string;
  description: string;

  constructor(id: string, code: string, description: string) {
    this.id = id;
    this.code = code;
    this.description = description;
  }

  static getAll = async (): Promise<Array<Action>> => {
    const query = await connection.query(
      ` SELECT 
            id,
            code, 
            description    
          FROM 
              app.action
          WHERE 
              deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Action>> => {
    const query = await connection.query(
      ` SELECT 
            id,
            code, 
            description,
            created_at AS "createdAt",
            updated_at AS "updatedAt"   
        FROM 
            app.action
        WHERE  
            id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static getByCode = async (code: string): Promise<Array<Action>> => {
    const query = await connection.query(
      ` SELECT 
            id,
            code, 
            description,
            created_at AS "createdAt",
            updated_at AS "updatedAt"   
        FROM 
            app.action
        WHERE  
            code = $1 AND deleted_at IS NULL`,
      [code]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static upsert = async (code: string, description: string) => {
    const response = await connection.query(
      `
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
            action_data act`,
      [code, description]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static deleteById = async (id: string): Promise<Action | null> => {
    const response = await connection.query(
      `UPDATE app.action 
             SET deleted_at = now()
             WHERE id = $1
             RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    return response.rows[0] || null;
  };
}

export default Action;

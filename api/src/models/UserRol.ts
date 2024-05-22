import connection from "../utils/lib/pg";

class UserRol {
  userId: string;
  rolId: string;

  constructor(userId: string, rolId: string) {
    this.userId = userId;
    this.rolId = rolId;
  }

  static assignRol = async (
    userId: string,
    rolId: string
  ): Promise<UserRol | null> => {
    const response = await connection.query(
      `WITH assigned_user_rol AS (
        INSERT INTO app.user_rol (user_id, rol_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, rol_id) 
        DO UPDATE SET updated_at = now()
        RETURNING *
    )
    SELECT 
        per.id,
        per.id AS "personId",
        per.rut,
        per.name,
        per.paternal_lastname AS "paternalLastName",
        per.maternal_lastname AS "maternalLastName",
        per.email,
        (
            SELECT json_agg(json_build_object('id', rol.id, 'name', rol.name , 'code', rol.code))
            FROM app.user_rol uro
            INNER JOIN app.rol rol ON uro.rol_id = rol.id
            WHERE usr.id = uro.user_id 
            AND uro.deleted_at IS NULL
        ) AS roles,
        usr.created_at AS "createdAt",
        usr.updated_at AS "updatedAt"
    FROM 
        app.user usr
    JOIN 
        assigned_user_rol uro ON usr.id = uro.user_id
    JOIN 
        app.person per ON usr.person_id = per.id
    WHERE 
        usr.id = $1
        AND usr.deleted_at IS NULL`,
      [userId, rolId]
    );

    return response.rowCount ? response.rows[0] : null;
  };

  static removeRol = async (
    userId: string,
    rolId: string
  ): Promise<UserRol | null> => {
    const response = await connection.query(
      `WITH removed_user_rol AS (
        UPDATE app.user_rol 
        SET deleted_at = now()
        WHERE user_id = $1
        AND rol_id = $2
        RETURNING *
      )
      SELECT 
        per.id,
        per.id AS "personId",
        per.rut,
        per.name,
        per.paternal_lastname AS "paternalLastName",
        per.maternal_lastname AS "maternalLastName",
        per.email,
        (
            SELECT json_agg(json_build_object('id', rol.id, 'name', rol.name , 'code', rol.code))
            FROM app.user_rol uro
            INNER JOIN app.rol rol ON uro.rol_id = rol.id
            WHERE usr.id = uro.user_id 
            AND uro.deleted_at IS NULL
        ) AS roles,
        usr.created_at AS "createdAt",
        usr.updated_at AS "updatedAt"
      FROM 
        app.user usr
      CROSS JOIN 
        removed_user_rol uro
      JOIN 
        app.person per ON usr.person_id = per.id
      WHERE 
        usr.id = uro.user_id 
        AND usr.deleted_at IS NULL`,
      [userId, rolId]
    );

    return response.rowCount ? response.rows[0] : null;
  };
}
export default UserRol;

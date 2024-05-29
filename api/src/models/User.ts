import connection from "../utils/lib/pg";
import bcrypt from "bcrypt";

class User {
  id: string;
  personId: string;
  hash: string;
  constructor(id: string, personId: string, hash: string) {
    this.id = id;
    this.personId = personId;
    this.hash = hash;
  }

  static getAll = async (): Promise<Array<User>> => {
    const query = await connection.query(
      ` SELECT 
        use.id, 
        use.person_id AS "personId", 
        per.rut, 
        per.name,
        per.paternal_lastname AS "paternalLastName", 
        per.maternal_lastname AS "maternalLastName",
        per.email       
      FROM 
          app.user use
      LEFT JOIN 
      app.person per ON use.person_id = per.id
      WHERE 
          use.deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<User> => {
    const response = await connection.query(
      `SELECT 
      use.id, 
      use.person_id AS "personId", 
      per.rut, 
      per.name,
      per.paternal_lastname AS "paternalLastName", 
      per.maternal_lastname AS "maternalLastName",
      per.email,
      (
        SELECT json_agg(json_build_object('id', rol.id, 'name', rol.name , 'code', rol.code))
        FROM app.user_rol uro
        INNER JOIN app.rol rol ON uro.rol_id = rol.id
        WHERE use.id = uro.user_id 
        AND uro.deleted_at IS NULL
    ) AS roles
                 
    FROM 
        app.user use
    LEFT JOIN 
    app.person per ON use.person_id = per.id
    WHERE 
       use.id = $1 AND use.deleted_at IS NULL`,
      [id]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static getByRut = async (rut: string): Promise<User> => {
    const response = await connection.query(
      `SELECT 
      use.id, 
      use.person_id AS "personId", 
      per.rut, 
      per.name,
      per.paternal_lastname AS "paternalLastName", 
      per.maternal_lastname AS "maternalLastName",
      per.email              
    FROM 
        app.user use
    LEFT JOIN 
    app.person per ON use.person_id = per.id
    WHERE 
       per.rut = $1 AND use.deleted_at IS NULL`,
      [rut]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static upsert = async (
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    password: string
  ) => {
    const hash = await bcrypt.hash(password, 10);
    const response = await connection.query(
      `
        WITH person_data AS (
          INSERT INTO app.person (rut, name, paternal_lastname, maternal_lastname, email) 
            VALUES ($1, $2, $3, $4, $5) 
            ON CONFLICT (rut)
            DO UPDATE SET name = $2, paternal_lastname = $3, maternal_lastname = $4, email = $5, updated_at = now()
            RETURNING *
          ), user_data AS (
            INSERT INTO app.user (person_id, hash) 
            VALUES ((SELECT id FROM person_data), $6)
            ON CONFLICT (person_id)
            DO UPDATE SET hash = $6, updated_at = now()
            RETURNING *
        )
          SELECT
          use.id, 
          per.id AS "idPerson", 
          per.rut, 
          per.name, 
          per.paternal_lastname AS "paternalLastName", 
          per.maternal_lastname AS "maternalLastName",
          per.email,

          (SELECT json_agg(json_build_object('id', r.id, 'name', r.name, 'code', r.code)) 
          FROM app.rol r
          INNER JOIN app.user_rol uro ON uro.rol_id = r.id
          WHERE uro.user_id = use.id
          AND r.deleted_at IS NULL
        ) AS roles,


          per.created_at AS "createdAt",
          per.updated_at AS "updatedAt"
        FROM 
        user_data use
        LEFT JOIN 
        person_data per ON use.person_id = per.id`,
      [rut, name, paternalLastName, maternalLastName, email, hash]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static deleteById = async (id: string): Promise<User | null> => {
    const response = await connection.query(
      `WITH updated_user AS (
           UPDATE app.user 
           SET deleted_at = now()
           WHERE id = $1
           RETURNING id, person_id
         )
         UPDATE app.person 
         SET deleted_at = now()
         WHERE id IN (SELECT person_id FROM updated_user)
        `,
      [id]
    );

    return response.rows[0] || null;
  };

  static updatePassword = async (personId: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);
    const response = await connection.query(
      `
        INSERT INTO app.user (person_id, hash)
        VALUES ($1, $2)
        ON CONFLICT (person_id)
        DO UPDATE SET hash = $2, updated_at = now()
        RETURNING id, updated_at AS "updatedAt";
      `,
      [personId, hash]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static validate = async (email: string): Promise<User | null> => {
    console.log(email);
    const response = await connection.query(
      `SELECT 
      usr.id,
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
      usr.updated_at AS "updatedAt",
      usr.hash
      FROM 
          app.user usr
      INNER JOIN 
          app.person per ON usr.person_id = per.id
      WHERE per.email = $1 AND usr.deleted_at IS NULL`,
      [email]
    );
    return response.rowCount ? response.rows[0] : null;
  };
}
export default User;

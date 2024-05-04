import connection from '../utils/lib/pg';

class Person {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  sede_id: string;

  constructor(
    id: string,
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    sede_id: string
  ) {
    this.id = id;
    this.rut = rut;
    this.name = name;
    this.paternalLastName = paternalLastName;
    this.maternalLastName = maternalLastName;
    this.sede_id = sede_id;
  }

  static getAll = async (): Promise<Array<Person>> => {
    const query = await connection.query(
      `   
    SELECT
        per.id,
        per.rut, 
        per.name, 
        per.paternal_lastname, 
        per.maternal_lastname, 
        sed.name AS "comuna"
    FROM app.person per
    LEFT JOIN 
        app.sede sed ON per.sede_id = sed.id
    WHERE per.deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Person>> => {
    const query = await connection.query(
      `SELECT
            per.id,
            per.rut, 
            per.name, 
            per.paternal_lastname, 
            per.maternal_lastname, 
            sed.name AS "comuna"
        FROM app.person per
        LEFT JOIN 
            app.sede sed ON per.sede_id = sed.id
        WHERE per.id = $1 AND per.deleted_at IS NULL`,
      [id]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static getByRut = async (rut: string): Promise<Array<Person>> => {
    const query = await connection.query(
      `SELECT
            per.id,
            per.rut, 
            per.name, 
            per.paternal_lastname, 
            per.maternal_lastname, 
            sed.name AS "comuna"
        FROM app.person per
        LEFT JOIN 
            app.sede sed ON per.sede_id = sed.id
        WHERE per.rut = $1 AND per.deleted_at IS NULL`,
      [rut]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static upsert = async (
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    sede_id: string
  ) => {
    const response = await connection.query(
      `
        WITH person_data AS (
          INSERT INTO app.person (rut, name, paternal_lastname, maternal_lastname, sede_id) 
            VALUES ($1, $2, $3, $4, $5) 
            ON CONFLICT (rut)
            DO UPDATE SET name = $2, paternal_lastname = $3, maternal_lastname = $4, sede_id = $5, updated_at = now()
            RETURNING *
        )
          SELECT 
          per.id, 
          per.rut, 
          per.name, 
          per.paternal_lastname AS "paternalLastName", 
          per.maternal_lastname AS "maternalLastName",
          sed.name AS "Comuna",
          per.created_at AS "createdAt",
          per.updated_at AS "updatedAt"        
        FROM 
        person_data per
        LEFT JOIN 
        app.sede sed ON per.sede_id = sed.id`,
      [rut, name, paternalLastName, maternalLastName, sede_id]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static deleteById = async (id: string): Promise<Person | null> => {
    const response = await connection.query(
      `UPDATE app.person 
             SET deleted_at = now()
             WHERE id = $1
             RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    return response.rows[0] || null;
  };
}

export default Person;

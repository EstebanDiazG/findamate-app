import connection from '../utils/lib/pg';

class Person {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;

  constructor(
    id: string,
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string
  ) {
    this.id = id;
    this.rut = rut;
    this.name = name;
    this.paternalLastName = paternalLastName;
    this.maternalLastName = maternalLastName;
    this.email = email;
  }

  static getAll = async (): Promise<Array<Person>> => {
    const query = await connection.query(
      `   
    SELECT
        id,
        rut, 
        name, 
        paternal_lastname, 
        maternal_lastname
    FROM app.person
    WHERE deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Person>> => {
    const query = await connection.query(
      `SELECT
            id,
            rut, 
            name, 
            paternal_lastname, 
            maternal_lastname
        FROM app.person
        WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static getByRut = async (rut: string): Promise<Array<Person>> => {
    const query = await connection.query(
      `SELECT
            id,
            rut, 
            name, 
            paternal_lastname, 
            maternal_lastname
        FROM app.person
        WHERE rut = $1 AND deleted_at IS NULL`,
      [rut]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static upsert = async (
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string
  ) => {
    const response = await connection.query(
      `
        WITH person_data AS (
          INSERT INTO app.person (rut, name, paternal_lastname, maternal_lastname, email) 
            VALUES ($1, $2, $3, $4, $5) 
            ON CONFLICT (email)
            DO UPDATE SET rut = $1, name = $2, paternal_lastname = $3, maternal_lastname = $4, email = $5, updated_at = now()
            RETURNING *
        )
          SELECT 
          id, 
          rut, 
          name ||' '|| paternal_lastname ||' '|| maternal_lastname AS "Nombre completo",
          email,
          created_at AS "createdAt",
          updated_at AS "updatedAt"        
        FROM 
        person_data`,
      [rut, name, paternalLastName, maternalLastName, email]
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

import connection from "../utils/lib/pg";
import bcrypt from "bcrypt";

class Profile {
  id: string;
  id_person: string;
  id_imagen: string;
  description: string;

  constructor(
    id: string,
    id_person: string,
    id_imagen: string,
    description: string
  ) {
    this.id = id;
    this.id_person = id_person;
    this.id_imagen = id_imagen;
    this.description = description;
  }

  static getAll = async (): Promise<Array<Profile>> => {
    const query = await connection.query(
      `   
        SELECT
            pro.id,
            per.id AS "personId", 
            per.name AS "name", 
            per.paternal_lastname AS "paternalLastName", 
            per.maternal_lastname AS "maternalLastName",
            us.hash AS "password",
            pro.description
        FROM app.profile pro
        LEFT JOIN 
            app.person per ON per.id = pro.id_person
        LEFT JOIN
            app.user us ON per.id = us.person_id
        WHERE pro.deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Profile>> => {
    const query = await connection.query(
      `   
            SELECT
                pro.id,
                per.id AS "personId", 
                per.name AS "name", 
                per.paternal_lastname AS "paternalLastName",
                per.maternal_lastname AS "maternalLastName",
                pro.description
            FROM app.profile pro
            LEFT JOIN 
                app.person per ON per.id = pro.id_person
            LEFT JOIN
                app.user us ON per.id = us.person_id
            WHERE pro.id = $1 AND pro.deleted_at IS NULL`,
      [id]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static getByIdPerson = async (id_person: string): Promise<Array<Profile>> => {
    const query = await connection.query(
      `   
            SELECT
                pro.id,
                per.id AS "personId", 
                per.name AS "name", 
                per.paternal_lastname AS "paternalLastName", 
                per.maternal_lastname AS "maternalLastName",
                pro.description
            FROM app.profile pro
            LEFT JOIN 
                app.person per ON per.id = pro.id_person
            LEFT JOIN
                app.user us ON per.id = us.person_id
            WHERE pro.id_person = $1 AND pro.deleted_at IS NULL`,
      [id_person]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static deleteById = async (id: string): Promise<Profile | null> => {
    const response = await connection.query(
      `UPDATE app.profile 
                     SET deleted_at = now()
                     WHERE id = $1
                     RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    return response.rows[0] || null;
  };

  static update = async (
    id: string,
    description: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string
  ): Promise<Profile | null> => {
    const response = await connection.query(
      `WITH updated_profile AS (
        UPDATE app.profile 
        SET description = $2
        WHERE id = $1
        RETURNING id, description, id_person
      ), updated_person AS (
        UPDATE app.person 
        SET name = $3, paternal_lastname = $4, maternal_lastname = $5
        WHERE id = (SELECT id_person FROM updated_profile)
        RETURNING id ,name, paternal_lastname, maternal_lastname
      )
      SELECT updated_profile.id, updated_person.id AS "personId" , updated_profile.description, updated_person.name AS "name", updated_person.paternal_lastname, updated_person.maternal_lastname FROM updated_profile, updated_person`,
      [id, description, name, paternalLastName, maternalLastName]
    );

    return response.rows[0] || null;
  };
}

export default Profile;

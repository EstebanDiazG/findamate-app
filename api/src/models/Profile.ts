import connection from '../utils/lib/pg';
import bcrypt from 'bcrypt';

class Profile{
    id: string;
    id_person: string;
    id_imagen: string;
    description: string;

    constructor(
        id: string,
        id_person: string,
        id_imagen: string,
        description: string
    ){
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
            per.id AS "personID", 
            per.name AS "Name", 
            per.paternal_lastname AS "paternalLastName", 
            per.maternal_lastname AS "maternalLastName",
            us.hash AS "password",
            pro.description,
            pro.id_imagen
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
                per.id AS "personID", 
                per.name AS "Name", 
                per.paternal_lastname AS "paternalLastName",
                per.maternal_lastname AS "maternalLastName",
                us.hash AS "password",
                pro.description,
                pro.id_imagen
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
                per.id AS "personID", 
                per.name AS "Name", 
                per.paternal_lastname AS "paternalLastName", 
                per.maternal_lastname AS "maternalLastName",
                us.hash AS "password",
                pro.description,
                pro.id_imagen
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
        name: string,
        paternalLastName: string,
        maternalLastName: string,
        password: string,
        id_image: string,
        description: string,
        idPerson: string
      ) => {    
        const hash = await bcrypt.hash(password, 10);
        await connection.query('BEGIN');
        try {
          const profileResponse = await connection.query(
            `
            UPDATE app.profile
            SET description = $6, id_imagen = $5, updated_at = now()
            WHERE id_person = $7 
            RETURNING description, id_imagen, updated_at
            `,
            [description, id_image, idPerson]
          );
      
          const personResponse = await connection.query(
            `
            UPDATE app.person
            SET name = $1, paternal_lastname = $2, maternal_lastname = $3, updated_at = now()
            WHERE id = $7 
            RETURNING name, paternal_lastname, maternal_lastname, updated_at
            `,
            [name, paternalLastName, maternalLastName, idPerson]
          );
      
          const userResponse = await connection.query(
            `
            UPDATE app.user
            SET hash = $4, updated_at = now()
            WHERE person_id = $7
            RETURNING hash, updated_at
            `,
            [hash, idPerson]
          );
          await connection.query('COMMIT');
      
          return {
            profile: profileResponse.rows[0],
            person: personResponse.rows[0],
            user: userResponse.rows[0]
          };
        } catch (error) {
          await connection.query('ROLLBACK');
          throw error;
        }
    };


    static updatePersonProfile = async (name: string, paternalLastName: string, maternalLastName: string, idPerson: string) => { 
        const response = await connection.query(
        `
        UPDATE app.person
        SET name = $1, paternal_lastname = $2, maternal_lastname = $3, updated_at = now()
        WHERE id = $4
        RETURNING name, paternal_lastname, maternal_lastname, updated_at
        `
          ,
          [name, paternalLastName, maternalLastName, idPerson]
        );
        return response.rowCount ? response.rows[0] : null;
    };
    






    
      
}

export default Profile;
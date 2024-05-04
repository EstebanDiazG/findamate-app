import connection from '../utils/lib/pg';

class User{
    id: string;
    hash: string;
    rut_person: string;
    email: string;

    constructor(
        id: string,
        hash: string,
        rut_person: string,
        email: string
    ){
        this.id=id;
        this.hash=hash;
        this.rut_person=rut_person;
        this.email=email;
    }

    static getAll = async (): Promise<Array<User>> => {
        const query = await connection.query(
          `   
        SELECT
            us.id,
            us.rut_person, 
            per.name, 
            us.hash, 
            us.email 
        FROM app.user us
        LEFT JOIN 
            app.person per ON per.rut = us.rut_person
        WHERE us.deleted_at IS NULL`
        );
        return query.rows || [];
      };
    
      static getByRut = async (rut: string): Promise<Array<User>> => {
        const query = await connection.query(
          `SELECT
                us.id,
                us.rut_person, 
                per.name, 
                us.hash, 
                us.email
            FROM app.user us
            LEFT JOIN 
                app.person per ON per.rut = us.rut_person
            WHERE us.rut_person = $1 AND us.deleted_at IS NULL`,
          [rut]
        );
        return query.rowCount ? query.rows[0] : null;
      };

      static deleteById = async (id: string): Promise<User | null> => {
        const response = await connection.query(
          `UPDATE app.user 
                 SET deleted_at = now()
                 WHERE id = $1
                 RETURNING id, deleted_at AS "deletedAt"`,
          [id]
        );
        return response.rows[0] || null;
      };

}
export default User;
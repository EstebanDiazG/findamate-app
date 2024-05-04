import connection from '../utils/lib/pg';

class User {
  id: string;
  hash: string;
  email: string;

  constructor(id: string, hash: string, email: string) {
    this.id = id;
    this.hash = hash;
    this.email = email;
  }

  static getAll = async (): Promise<Array<User>> => {
    const query = await connection.query(
      `   
        SELECT
            us.id,
            per.name, 
            us.hash, 
            us.email 
        FROM app.user us
        LEFT JOIN 
            app.person per ON per.email = us.email
        WHERE us.deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getByEmail = async (email: string): Promise<Array<User>> => {
    const query = await connection.query(
      `SELECT
                us.id,
                per.name, 
                us.hash, 
                us.email
            FROM app.user us
            LEFT JOIN 
                app.person per ON per.email = us.email
            WHERE us.email = $1 AND us.deleted_at IS NULL`,
      [email]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static upsert = async (hash: string, email: string, name: string) => {
    const response = await connection.query(
      `
        WITH user_data AS (
          INSERT INTO app.user (hash, email) 
            VALUES (crypt($1, gen_salt('bf')), $2 ) 
            ON CONFLICT (email)
            DO UPDATE SET hash = crypt($1, gen_salt('bf')) , updated_at = now()
          
        ), person_data AS (
          INSERT INTO app.person (name, email) 
            SELECT $3, $4   FROM user_data us
            ON CONFLICT (email)
            DO UPDATE SET name = $3, updated_at = now()
            
        ) SELECT 
            us.id,
            per.name, 
            per.email, 
            us.email,
            us.created_at AS "createdAt",
            us.updated_at AS "updatedAt"   
          FROM 
              app.user us
          LEFT JOIN 
              app.person per ON us.email = per.email
        `,
      [hash, email, name]
    );
    return response.rowCount ? response.rows[0] : null;
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
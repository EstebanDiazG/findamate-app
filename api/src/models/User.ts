import { hash } from 'crypto';
import connection from '../utils/lib/pg';
import bcrypt from 'bcrypt';

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

  static upsert = async (name: string, email: string, password: string) => {
    // Cifra la contraseña utilizando bcrypt
    const hash = await bcrypt.hash(password, 10);

    const response = await connection.query(
      `
      WITH person_data AS (
        INSERT INTO app.person (name, email) 
        VALUES ($1, $2)
        ON CONFLICT (email)
        DO UPDATE SET name = $1, updated_at = now()
        RETURNING *
    ), user_data AS (
        INSERT INTO app.user (hash, email) 
        VALUES ($3, $2)
        ON CONFLICT (email)
        DO UPDATE SET hash = $3, updated_at = now()
        RETURNING *
    )
    SELECT 
        us.id,
        per.name,
        us.email,
        us.created_at AS "createdAt",
        us.updated_at AS "updatedAt"   
    FROM 
        user_data us
    LEFT JOIN 
        person_data per ON us.email = per.email;
        `,
      [name, email, hash]
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

  static async login(auth: { email: string; hash: string }) {
    const result = await connection.query(
      `SELECT id, hash 
        FROM app.user
        WHERE email = $1`,
      [auth.email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const claveAlmacenada = result.rows[0].hash;

    console.log('Stored Hash:', claveAlmacenada);
    console.log('Received Hash:', auth.hash);

    const claveEncriptada = await bcrypt.compare(auth.hash, claveAlmacenada);

    if (claveEncriptada) {
      return {
        id: result.rows[0].id,
        email: auth.email,
      };
    } else {
      return null;
    }
  }
}
export default User;

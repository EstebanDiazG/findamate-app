import connection from "../utils/lib/pg";

class StudyGroup {
  name: string;
  description: string;
  type: string;

  constructor(name: string, description: string, type: string) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  static getAll = async (): Promise<Array<StudyGroup>> => {
    const query = await connection.query(
      `SELECT
            name,
            description,
            type
        FROM app.study_group
        WHERE deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<StudyGroup>> => {
    const query = await connection.query(
      `SELECT
            name,
            description,
            type,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt"
        FROM app.study_group
        WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return query.rowCount ? query.rows[0] : null;
  };

  static upsert = async (name: string, description: string, type: string) => {
    const query = await connection.query(
      `INSERT INTO app.study_group (name, description, type)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO UPDATE
        SET description = $2, type = $3, updated_at = now()
        RETURNING name`,
      [name, description, type]
    );
    return query.rows[0];
  };

  static delete = async (id: string): Promise<StudyGroup | null> => {
    const response = await connection.query(
      `UPDATE app.study_group
        SET deleted_at = now()
        WHERE id = $1
        RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    console.log("Response from query:", response);
    return response.rows[0] || null;
  };
}

export default StudyGroup;

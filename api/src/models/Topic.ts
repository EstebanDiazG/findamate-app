import connection from "../utils/lib/pg";

class Topic {
  id: string;
  id_person: string;
  content: string;
  id_interest: string;

  constructor(
    id: string,
    id_person: string,
    content: string,
    id_interest: string
  ) {
    this.id = id;
    this.id_person = id_person;
    this.content = content;
    this.id_interest = id_interest;
  }

  static getAll = async (): Promise<Array<Topic>> => {
    const query = await connection.query(
      `   
        SELECT
            tpc.id,
            tpc.id_person,
            tpc.title,
            tpc.content,
            per.name AS "creadorTopico",
            int.name AS "Interest",
            cat.name AS "categoryInterest"
        FROM app.topics tpc
        LEFT JOIN
            app.person per ON per.id = tpc.id_person
        LEFT JOIN
            app.interest int ON int.id = tpc.id_interest
        LEFT JOIN
            app.category_interest cat ON int.id = cat.id_interest
        WHERE tpc.deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Topic>> => {
    try {
      const query = await connection.query(
        `
          SELECT
              tpc.id,
              tpc.id_person,
              tpc.title,
              tpc.content,
              per.name AS "creadorTopico",
              int.name AS "Interest",
              cat.name AS "categoryInterest"
          FROM app.topics tpc
          LEFT JOIN
              app.person per ON per.id = tpc.id_person
          LEFT JOIN
              app.interest int ON int.id = tpc.id_interest
          LEFT JOIN
              app.category_interest cat ON int.id = cat.id_interest
          WHERE tpc.id = $1 AND tpc.deleted_at IS NULL`,
        [id]
      );
      return query.rowCount ? query.rows[0] : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static getByIdPerson = async (id_person: string): Promise<Array<Topic>> => {
    const query = await connection.query(
      `
        SELECT
            tpc.id,
            tpc.id_person,
            tpc.title,
            tpc.content,
            per.name AS "creadorTopico",
            int.name AS "Interest",
            cat.name AS "categoryInterest"
        FROM app.topics tpc
        LEFT JOIN
            app.person per ON per.id = tpc.id_person
        LEFT JOIN
            app.interest int ON int.id = tpc.id_interest
        LEFT JOIN
            app.category_interest cat ON int.id = cat.id_interest
        WHERE tpc.id_person = $1 AND tpc.deleted_at IS NULL`,
      [id_person]
    );
    return query.rows || [];
  };

  static upsert = async (
    id_person: string,
    title: string,
    content: string,
    id_interest: string
  ) => {
    const response = await connection.query(
      `
        INSERT INTO app.topics (id_person, title, content, id_interest) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [id_person, title, content, id_interest]
    );

    return response.rowCount ? response.rows[0] : null;
  };

  static update = async (
    id: string,
    content: string
  ): Promise<Topic | null> => {
    const response = await connection.query(
      `UPDATE app.topics 
            SET content = $2 , updated_at = now()
            WHERE id = $1
            RETURNING content AS "contenido"`,
      [id, content]
    );

    return response.rows[0] || null;
  };

  static deleteById = async (id: string): Promise<Topic | null> => {
    const response = await connection.query(
      `UPDATE app.topics 
                     SET deleted_at = now()
                     WHERE id = $1
                     RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    return response.rows[0] || null;
  };
}
export default Topic;

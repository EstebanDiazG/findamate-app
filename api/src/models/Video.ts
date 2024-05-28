import connection from "../utils/lib/pg";
class Video {
  id: string;
  idPerson: string;
  url: string;
  title: string;
  constructor(id: string, idPerson: string, url: string, title: string) {
    this.id = id;
    this.idPerson = idPerson;
    this.url = url;
    this.title = title;
  }
  static getAll = async (): Promise<Array<Video>> => {
    const query = await connection.query(
      `SELECT
            id,
            id_person AS "idPerson",
            url,
            title
        FROM app.video
        WHERE deleted_at IS NULL`
    );
    return query.rows || [];
  };

  static getById = async (id: string): Promise<Array<Video>> => {
    const videoQuery = await connection.query(
      `SELECT
            id,
            id_person AS "idPerson",
            url,
            title,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt"
        FROM app.video
        WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );

    const video = videoQuery.rowCount ? videoQuery.rows[0] : null;

    if (video) {
      const commentsQuery = await connection.query(
        `SELECT
                id_person AS "idPerson",
                id_video AS "idVideo",
                content,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                deleted_at AS "deletedAt"
            FROM app.comment_video
            WHERE id_video = $1 AND deleted_at IS NULL`,
        [id]
      );

      const likesQuery = await connection.query(
        `SELECT COUNT(created_at) AS "likesCount"
            FROM app.like_video
            WHERE id_video = $1 AND deleted_at IS NULL`,
        [id]
      );

      video.comments = commentsQuery.rows;
      video.likesCount = likesQuery.rows[0].likesCount;
    }

    return video ? video : null;
  };

  static getByPerson = async (idPerson: string): Promise<Array<Video>> => {
    const query = await connection.query(
      `SELECT
                id,
                id_person AS "idPerson",
                url,
                title,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                deleted_at AS "deletedAt"
            FROM app.video
            WHERE id_person = $1 AND deleted_at IS NULL`,
      [idPerson]
    );
    return query.rows || [];
  };

  static upsert = async (
    idPerson: string,
    url: string,
    title: string
  ): Promise<Video> => {
    const query = await connection.query(
      `INSERT INTO app.video (id_person, url, title)
            VALUES ($1, $2, $3)
            ON CONFLICT (url) DO UPDATE
            SET id_person = $1, title = $3
            RETURNING id, id_person AS "idPerson", url, title`,
      [idPerson, url, title]
    );
    return query.rows[0];
  };

  static deleteById = async (id: string): Promise<boolean> => {
    const response = await connection.query(
      `UPDATE app.video
            SET deleted_at = now()
            WHERE id = $1
            RETURNING id, deleted_at AS "deletedAt"`,
      [id]
    );
    return response.rows[0] || null;
  };
}

export default Video;

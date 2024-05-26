import { filesUploadUrl } from "../utils/functions/config";
import pool from "../utils/lib/pg";

export interface IFile {
  originalname?: string;
  internalname?: string;
  mimetype?: string;
  format?: string;
  size?: number;
  path?: string;
  encoding?: string;
}

export default class Files {
  constructor() {}

  static async search(query: {
    page: number;
    statusCode: number;
    limit: number;
  }) {
    const response = await pool.query(
      `SELECT file.id, '${filesUploadUrl}/' || file.internal_name AS url, count(*) over() AS total FROM app.file WHERE $3::int2 is null OR status_code = $3 ORDER BY created_at DESC LIMIT $2 OFFSET ($1 - 1) * $2;`,
      [query.page, query.limit, query.statusCode]
    );
    return response.rows;
  }

  static async create(file: IFile) {
    const response = await pool.query(
      "INSERT INTO app.file(original_name, internal_name, mimetype, format, size, path, encoding) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id;",
      [
        file.originalname || null,
        file.internalname || null,
        file.mimetype || null,
        file.format || null,
        file.size || null,
        file.path || null,
        file.encoding || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async updateById(id: string, file: IFile) {
    const response = await pool.query(
      "UPDATE app.file SET originalname = COALESCE($2, originalname), internalname = COALESCE($3, internalname), mimetype = COALESCE($4, mimetype), format = COALESCE($5, format), size = COALESCE($6, size), path = COALESCE($7, path), encoding = COALESCE($8, encoding) WHERE id = $1 RETURNING id;",
      [
        id,
        file.originalname || null,
        file.internalname || null,
        file.mimetype || null,
        file.format || null,
        file.size || null,
        file.path || null,
        file.encoding || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async getById(id: string) {
    const response = await pool.query(
      `SELECT id, original_name, internal_name, mimetype, format, size, path, encoding, '${filesUploadUrl}/' || internal_name AS url FROM app.file WHERE id = $1;`,
      [id]
    );
    return response.rows[0];
  }

  static async deleteById(id: string) {
    const response = await pool.query(
      "DELETE FROM app.file WHERE id = $1 RETURNING id;",
      [id]
    );
    return response.rowCount ? response.rows[0].id : null;
  }
}

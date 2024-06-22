import pool from "../utils/lib/pg";
import { mediaUploadUrl } from "../utils/functions/config";

interface IMedia {
  id?: string;
  type: string;
  original_name: string;
  internal_name: string;
  mimetype: string;
  format?: string;
  encoding: string;
  path: string;
  size: number;
  width?: number;
  height?: number;
  status_code?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export default class Media {
  constructor() {}

  static async search(query: {
    page: number;
    statusCode: number;
    limit: number;
  }) {
    const response = await pool.query(
      `
      SELECT media.id, '${mediaUploadUrl}/' || media.internal_name AS url, 
      count(*) over() AS total,
      internal_name 
      FROM app.media 
      WHERE $3::int2 is null OR status_code = $3 
      ORDER BY created_at DESC LIMIT $2 OFFSET ($1 - 1) * $2;`,
      [query.page, query.limit, query.statusCode]
    );
    return response.rows;
  }

  static async getById(id: string) {
    const response = await pool.query(
      `
      SELECT media.id, '${mediaUploadUrl}/' || media.internal_name AS url, 
      status_code, internal_name 
      FROM app.media 
      WHERE id = $1`,
      [id]
    );
    return response.rows[0];
  }

  static async create(media: IMedia) {
    const response = await pool.query(
      `INSERT INTO app.media
        (type, original_name, internal_name, mimetype, format, encoding, path, size, width, height)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING id`,
      [
        media.type,
        media.original_name,
        media.internal_name,
        media.mimetype,
        media.format || null,
        media.encoding,
        media.path,
        media.size,
        media.width || null,
        media.height || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async updateById(id: string, media: IMedia) {
    const response = await pool.query(
      `
      UPDATE app.media 
      SET type = COALESCE($2, type), 
      original_name = COALESCE($3, original_name), 
      internal_name = COALESCE($4, internal_name), 
      mimetype = COALESCE($5, mimetype), 
      format = COALESCE($6, format), 
      encoding = COALESCE($7, encoding), 
      path = COALESCE($8, path), 
      size = COALESCE($9, size), 
      width = COALESCE($10, width), 
      height = COALESCE($11, height) 
      WHERE id = $1 
      RETURNING id`,
      [
        id,
        media.type || null,
        media.original_name || null,
        media.internal_name || null,
        media.mimetype || null,
        media.format || null,
        media.encoding || null,
        media.path || null,
        media.size || null,
        media.width || null,
        media.height || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async deleteById(id: string) {
    const response = await pool.query(
      `UPDATE app.media SET status_code = 0 WHERE id = $1 RETURNING id`,
      [id]
    );
    return response.rows[0]?.id;
  }
}

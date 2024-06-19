// models/Media.ts
import pool from "../utils/lib/pg";
import { mediaUploadUrl } from "../utils/functions/config";

interface IMedia {
  id?: number;
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

export default {
  create: async (media: Partial<IMedia>) => {
    const { rows } = await pool.query(
      `INSERT INTO app.media (type, original_name, internal_name, mimetype, format, encoding, path, size, width, height, status_code) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [media.type, media.original_name, media.internal_name, media.mimetype, media.format, media.encoding, media.path, media.size, media.width, media.height, media.status_code]
    );
    return rows[0].id;
  },  
  getById: async (id: number) => {
    const { rows } = await pool.query(`SELECT * FROM app.media WHERE id = $1`, [id]);
    return rows[0];
  },
  deleteById: async (id: number) => {
    const { rows } = await pool.query(`DELETE FROM app.media WHERE id = $1 RETURNING id`, [id]);
    return rows[0];
  },
  search: async (query: { page: number; statusCode: number; limit: number }) => {
    const { rows } = await pool.query(
      `SELECT id, '${mediaUploadUrl}/' || id AS url, mimetype, internal_name AS filename, path AS filepath, created_at, updated_at, status_code 
       FROM app.media 
       WHERE $3::int2 IS NULL OR status_code = $3 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET ($1 - 1) * $2;`,
      [query.page, query.limit, query.statusCode]
    );
    return rows;
  },
  
};

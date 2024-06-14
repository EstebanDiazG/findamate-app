import { imagesUploadUrl } from "../utils/functions/config";
import pool from "../utils/lib/pg";

interface IImage {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  format?: string;
  width?: number;
  height?: number;
  size?: number;
}

export default class Images {
  constructor() {}

  static async search(query: {
    page: number;
    statusCode: number;
    limit: number;
  }) {
    const response = await pool.query(
      `SELECT img.id, '${imagesUploadUrl}/' || img.id || '.jpg' AS url FROM app.image img WHERE $3::int2 is null OR status_code = $3 ORDER BY created_at DESC LIMIT $2 OFFSET ($1 - 1) * $2;`,
      [query.page, query.limit, query.statusCode]
    );
    return response.rows;
  }

  static async create(image: IImage) {
    const response = await pool.query(
      "INSERT INTO app.image(fieldname, originalname, encoding, mimetype, format, width, height, size) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;",
      [
        image.fieldname || null,
        image.originalname || null,
        image.encoding || null,
        image.mimetype || null,
        image.format || null,
        image.width || null,
        image.height || null,
        image.size || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async updateById(id: string, image: IImage) {
    const response = await pool.query(
      "UPDATE app.image SET fieldname = COALESCE($2, fieldname), originalname = COALESCE($3, originalname), encoding = COALESCE($4, encoding), mimetype = COALESCE($5, mimetype), format = COALESCE($6, format), width = COALESCE($7, width), height = COALESCE($8, height),  size = COALESCE($9, size) WHERE id = $1 RETURNING id;",
      [
        id,
        image.fieldname || null,
        image.originalname || null,
        image.encoding || null,
        image.mimetype || null,
        image.format || null,
        image.width || null,
        image.height || null,
        image.size || null,
      ]
    );
    return response.rows[0]?.id;
  }

  static async getById(id: string) {
    const response = await pool.query(
      `SELECT id, fieldname, originalname, encoding, mimetype, format, width, height, size, '${imagesUploadUrl}/' || id || '.jpg' AS url
            FROM app.image
            WHERE id = $1`,
      [id]
    );

    return response.rowCount ? response.rows[0] : null;
  }

  static async deleteById(id: string) {
    const response = await pool.query(
      `DELETE FROM app.image WHERE id = $1 RETURNING id`,
      [id]
    );

    return response.rowCount ? response.rows[0].id : null;
  }
}

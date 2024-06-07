"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class Video {
    constructor(id, idPerson, url, title) {
        this.id = id;
        this.idPerson = idPerson;
        this.url = url;
        this.title = title;
    }
}
_a = Video;
Video.getAll = async () => {
    const query = await pg_1.default.query(`SELECT
            id,
            id_person AS "idPerson",
            url,
            title
        FROM app.video
        WHERE deleted_at IS NULL`);
    return query.rows || [];
};
Video.getById = async (id) => {
    const videoQuery = await pg_1.default.query(`SELECT
            id,
            id_person AS "idPerson",
            url,
            title,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt"
        FROM app.video
        WHERE id = $1 AND deleted_at IS NULL`, [id]);
    const video = videoQuery.rowCount ? videoQuery.rows[0] : null;
    if (video) {
        const commentsQuery = await pg_1.default.query(`SELECT
                id_person AS "idPerson",
                id_video AS "idVideo",
                content,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                deleted_at AS "deletedAt"
            FROM app.comment_video
            WHERE id_video = $1 AND deleted_at IS NULL`, [id]);
        const likesQuery = await pg_1.default.query(`SELECT COUNT(created_at) AS "likesCount"
            FROM app.like_video
            WHERE id_video = $1 AND deleted_at IS NULL`, [id]);
        video.comments = commentsQuery.rows;
        video.likesCount = likesQuery.rows[0].likesCount;
    }
    return video ? video : null;
};
Video.getByPerson = async (idPerson) => {
    const query = await pg_1.default.query(`SELECT
                id,
                id_person AS "idPerson",
                url,
                title,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                deleted_at AS "deletedAt"
            FROM app.video
            WHERE id_person = $1 AND deleted_at IS NULL`, [idPerson]);
    return query.rows || [];
};
Video.upsert = async (idPerson, url, title) => {
    const query = await pg_1.default.query(`INSERT INTO app.video (id_person, url, title)
            VALUES ($1, $2, $3)
            ON CONFLICT (url) DO UPDATE
            SET id_person = $1, title = $3
            RETURNING id, id_person AS "idPerson", url, title`, [idPerson, url, title]);
    return query.rows[0];
};
Video.deleteById = async (id) => {
    const response = await pg_1.default.query(`UPDATE app.video
            SET deleted_at = now()
            WHERE id = $1
            RETURNING id, deleted_at AS "deletedAt"`, [id]);
    return response.rows[0] || null;
};
exports.default = Video;

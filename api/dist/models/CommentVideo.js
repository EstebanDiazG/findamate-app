"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class CommentVideo {
    constructor(id_person, id_video, content) {
        this.id_person = id_person;
        this.id_video = id_video;
        this.content = content;
    }
}
_a = CommentVideo;
CommentVideo.giveComment = async (id_person, id_video, content) => {
    const response = await pg_1.default.query(`
        WITH updated_comment_video AS (
          INSERT INTO app.comment_video (id_person, id_video, content)
          VALUES ($1, $2, $3)
          ON CONFLICT (id_person, id_video) 
          DO UPDATE SET content = $3, updated_at = now()
          RETURNING *
        ),
        persons AS (
          SELECT 
            cv.id_video,
            json_build_object(
              'id', p.id,
              'rut', p.rut,
              'name', p.name,
              'paternal_lastname', p.paternal_lastname,
              'maternal_lastname', p.maternal_lastname,
              'email', p.email
            ) AS person
          FROM 
            updated_comment_video AS cv
          LEFT JOIN app.person p ON cv.id_person = p.id
        ),
        videos AS (
          SELECT 
            cv.id_person,
            json_build_object(
              'id', v.id,
              'url', v.url,
              'title', v.title,
              'content', cv.content
            ) AS video
          FROM 
            updated_comment_video AS cv
          LEFT JOIN app.video v ON cv.id_video = v.id
        )
        SELECT * FROM persons, videos
      `, [id_person, id_video, content]);
    return response.rowCount ? response.rows[0] : null;
};
CommentVideo.removeComment = async (id_person, id_video, content) => {
    const response = await pg_1.default.query(`
        WITH updated_comment_video AS (
          UPDATE app.comment_video
          SET content = $3, updated_at = NOW(), deleted_at = NOW()
          WHERE id_person = $1 AND id_video = $2
          RETURNING *
        ),
        persons AS (
          SELECT 
            cv.id_video,
            json_build_object(
              'id', p.id,
              'rut', p.rut,
              'name', p.name,
              'paternal_lastname', p.paternal_lastname,
              'maternal_lastname', p.maternal_lastname,
              'email', p.email
            ) AS person
          FROM 
            updated_comment_video AS cv
          LEFT JOIN app.person p ON cv.id_person = p.id 
        ),
        videos AS (
          SELECT 
            cv.id_person,
            json_build_object(
              'id', v.id,
              'url', v.url,
              'title', v.title,
              'content', cv.content,
              'deleted_at', cv.deleted_at
            ) AS video
          FROM 
            updated_comment_video AS cv
          LEFT JOIN app.video v ON cv.id_video = v.id 
        )
        SELECT * FROM persons, videos
      `, [id_person, id_video, content]);
    return response.rowCount ? response.rows[0] : null;
};
exports.default = CommentVideo;

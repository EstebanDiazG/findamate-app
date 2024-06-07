"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class LikeVideo {
    constructor(id_person, id_video) {
        this.id_person = id_person;
        this.id_video = id_video;
    }
}
_a = LikeVideo;
LikeVideo.giveLike = async (id_person, id_video) => {
    const response = await pg_1.default.query(`
        WITH updated_like_video AS (
          INSERT INTO app.like_video (id_person, id_video)
          VALUES ($1, $2)
          ON CONFLICT (id_person, id_video) 
          DO UPDATE SET updated_at = now()
          RETURNING *
        ),
        persons AS (
          SELECT 
            lv.id_video,
            json_build_object(
              'id', p.id,
              'rut', p.rut,
              'name', p.name,
              'paternal_lastname', p.paternal_lastname,
              'maternal_lastname', p.maternal_lastname,
              'email', p.email
            ) AS person
          FROM 
            updated_like_video AS lv
          LEFT JOIN app.person p ON lv.id_person = p.id
        ),
        videos AS (
          SELECT 
            lv.id_person,
            json_build_object(
              'id', v.id,
              'url', v.url,
              'title', v.title
            ) AS video
          FROM 
            updated_like_video AS lv
          LEFT JOIN app.video v ON lv.id_video = v.id
        )
        SELECT * FROM persons, videos
      `, [id_person, id_video]);
    return response.rowCount ? response.rows[0] : null;
};
LikeVideo.removeLike = async (id_person, id_video) => {
    const response = await pg_1.default.query(`
        WITH updated_like_video AS (
          UPDATE app.like_video
          SET deleted_at = NOW() , updated_at = NOW()
          WHERE id_person = $1 AND id_video = $2
          RETURNING *
        ),
        persons AS (
          SELECT 
            lv.id_video,
            json_build_object(
              'id', p.id,
              'rut', p.rut,
              'name', p.name,
              'paternal_lastname', p.paternal_lastname,
              'maternal_lastname', p.maternal_lastname,
              'email', p.email
            ) AS person
          FROM 
            updated_like_video AS lv
            INNER JOIN app.person p ON lv.id_person = p.id 
        ),
        videos AS (
          SELECT 
            lv.id_person,
            json_build_object(
              'id', v.id,
              'url', v.url,
              'title', v.title
            ) AS video
          FROM 
            updated_like_video AS lv
            INNER JOIN app.video v ON lv.id_video = v.id 
        )
        SELECT 
          (SELECT persons.person FROM persons) AS persons,
          (SELECT videos.video FROM videos) AS videos,
          (SELECT deleted_at FROM updated_like_video) AS deleted_at
      `, [id_person, id_video]);
    return response.rowCount ? response.rows[0] : null;
};
exports.default = LikeVideo;

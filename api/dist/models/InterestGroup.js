"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../utils/lib/pg"));
class InterestGroup {
    constructor(id_person, id_interest) {
        this.id_person = id_person;
        this.id_interest = id_interest;
    }
}
_a = InterestGroup;
InterestGroup.getInterestsByPersonId = async (id_person) => {
    const response = await pg_1.default.query(` SELECT ig.state, itr.id, itr.name 
            FROM app.interestgroup ig
            JOIN app.interest itr ON ig.id_interest = itr.id
            WHERE ig.id_person = $1 AND ig.state = '1'`, [id_person]);
    return response.rows;
};
InterestGroup.assignInterest = async (id_person, id_interest) => {
    const groupExists = await pg_1.default.query(`SELECT 1 FROM app.interest WHERE id = $1`, [id_interest]);
    if (!groupExists.rowCount) {
        throw new Error(`Interest group with id ${id_interest} does not exist`);
    }
    const response = await pg_1.default.query(`WITH updated_interest_group_person AS (
            INSERT INTO app.interestgroup (id_person, id_interest)
            VALUES ($1, $2)
            ON CONFLICT (id_person, id_interest) 
            DO UPDATE SET updated_at = now(), state = '1'
            RETURNING *
        ),
        persons AS (
            SELECT 
                uig.id_interest,
                json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'email', p.email
                ) AS person
            FROM 
            updated_interest_group_person AS uig
            LEFT JOIN app.person p ON uig.id_person = p.id 
            WHERE 
                uig.id_person = $1
        )
        SELECT 
            itr.id,
            itr.name,
            json_agg(persons.person) AS persons,
            uig.created_at AS "createdAt", 
            uig.updated_at AS "updatedAt"
        FROM
            app.interest AS itr
        LEFT JOIN
            updated_interest_group_person uig ON itr.id = uig.id_interest
        LEFT JOIN
            persons ON itr.id = persons.id_interest
        WHERE 
            itr.id = $3
        GROUP BY
            itr.id,
            itr.name,
            uig.created_at,
            uig.updated_at;
        `, [id_person, id_interest, id_interest]);
    return response.rowCount ? response.rows[0] : null;
};
InterestGroup.removeInterest = async (id_person, id_interest) => {
    const response = await pg_1.default.query(`WITH updated_interest_group_person AS (
                UPDATE app.interestgroup
                SET state = '2', updated_at = NOW()
                WHERE id_person = $1 AND id_interest = $2
                RETURNING *
            ),
            persons AS (
                SELECT 
                    uig.id_interest,
                    json_build_object(
                        'id', p.id,
                        'name', p.name,
                        'email', p.email
                    ) AS person
                FROM 
                updated_interest_group_person AS uig
                LEFT JOIN app.person p ON uig.id_person = p.id 
                WHERE 
                    uig.id_person = $1
            )
            SELECT 
                itr.id,
                itr.name,
                json_agg(persons.person) AS persons,
                uig.created_at AS "createdAt", 
                uig.updated_at AS "updatedAt"
            FROM
                app.interest AS itr
            LEFT JOIN
                updated_interest_group_person uig ON itr.id = uig.id_interest
            LEFT JOIN
                persons ON itr.id = persons.id_interest
            WHERE 
                itr.id = $2
            GROUP BY
                itr.id,
                itr.name,
                uig.created_at,
                uig.updated_at;
            `, [id_person, id_interest]);
    return response.rowCount ? response.rows[0] : null;
};
exports.default = InterestGroup;

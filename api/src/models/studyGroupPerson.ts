import connection from "../utils/lib/pg";

class StudyGroupPerson {
  groupId: string;
  personId: string;

  constructor(groupId: string, personId: string) {
    this.groupId = groupId;
    this.personId = personId;
  }

  static assignPerson = async (
    id_person: string,
    id_group: string
  ): Promise<StudyGroupPerson | null> => {
    const groupExists = await connection.query(
      `SELECT 1 FROM app.study_group WHERE id = $1`,
      [id_group]
    );

    if (!groupExists.rowCount) {
      throw new Error(`Study group with id ${id_group} does not exist`);
    }

    const response = await connection.query(
      `WITH updated_study_group_person AS (
            INSERT INTO app.study_group_person (id_person, id_group)
            VALUES ($1, $2)
            ON CONFLICT (id_person, id_group) 
            DO UPDATE SET updated_at = now()
            RETURNING *
        ),
        persons AS (
            SELECT 
                sgp.id_group,
                json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'email', p.email
                ) AS person
            FROM 
                updated_study_group_person AS sgp
            LEFT JOIN app.person p ON sgp.id_person = p.id 
            WHERE 
                sgp.id_person = $1
        )
        SELECT 
            sg.id,
            sg.name,
            json_agg(persons.person) AS persons,
            sgp.created_at AS "createdAt", 
            sgp.updated_at AS "updatedAt"
        FROM
            app.study_group AS sg
        LEFT JOIN
            updated_study_group_person sgp ON sg.id = sgp.id_group
        LEFT JOIN
            persons ON sg.id = persons.id_group
        WHERE 
            sg.id = $3
        GROUP BY
            sg.id,
            sg.name,
            sgp.created_at,
            sgp.updated_at;
        `,
      [id_person, id_group, id_group]
    );
    return response.rowCount ? response.rows[0] : null;
  };

  static removePerson = async (
    id_person: string,
    id_group: string
  ): Promise<StudyGroupPerson | null> => {
    const response = await connection.query(
        `WITH updated_study_group_person AS (
            UPDATE app.study_group_person
            SET deleted_at = NOW(), updated_at = NOW()
            WHERE id_person = $1 AND id_group = $2
            RETURNING *
        ),
        persons AS (
            SELECT 
                sgp.id_group,
                json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'email', p.email
                ) AS person
            FROM 
                updated_study_group_person AS sgp
            LEFT JOIN app.person p ON sgp.id_person = p.id 
            WHERE 
                sgp.id_person = $1 
        )
        SELECT 
            sg.id,
            sg.name,
            json_agg(persons.person) AS persons,
            sgp.created_at AS "createdAt", 
            sgp.updated_at AS "updatedAt",
            sgp.deleted_at AS "deletedAt"
        FROM
            app.study_group AS sg
        LEFT JOIN
            updated_study_group_person sgp ON sg.id = sgp.id_group
        LEFT JOIN
            persons ON sg.id = persons.id_group
        WHERE 
            sg.id = $2
        GROUP BY
            sg.id,
            sg.name,
            sgp.created_at,
            sgp.updated_at,
            sgp.deleted_at;
        `,
        [id_person, id_group]
    );
    return response.rowCount ? response.rows[0] : null;
  };


}

export default StudyGroupPerson;

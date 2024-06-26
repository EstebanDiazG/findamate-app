import connection from "../utils/lib/pg";

class InterestGroup{
    id_person: string;
    id_interest: string;

    constructor(id_person: string, id_interest: string)
    {
        this.id_person = id_person;
        this.id_interest = id_interest;
    }

    static getInterestsByPersonId = async (id_person: string): Promise<any> => {
        const response = await connection.query(
            ` SELECT ig.state, itr.id, itr.name 
            FROM app.interestgroup ig
            JOIN app.interest itr ON ig.id_interest = itr.id
            WHERE ig.id_person = $1 AND ig.state = '1'`,
            [id_person]
        );
    
        return response.rows;
    };

    static assignInterest = async (
        id_person: string,
        id_interest: string
    ): Promise<InterestGroup | null> => {
        const groupExists = await connection.query(
        `SELECT 1 FROM app.interest WHERE id = $1`,
        [id_interest]
        );
    
        if (!groupExists.rowCount) {
        throw new Error(`Interest group with id ${id_interest} does not exist`);
        }
    
        const response = await connection.query(
        `WITH updated_interest_group_person AS (
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
        `
        ,
        [id_person, id_interest, id_interest]
        );
        return response.rowCount ? response.rows[0] : null;
    };

    static removeInterest = async (
        id_person: string,
        id_interest: string
      ): Promise<InterestGroup | null> => {
        const response = await connection.query(
          `WITH updated_interest_group_person AS (
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
            `,
          [id_person, id_interest]
        );
      
        return response.rowCount ? response.rows[0] : null;
      };
      

}
export default InterestGroup;

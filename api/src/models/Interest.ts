import connection from '../utils/lib/pg';

class Interest{
    id: string;
    name: string;

    constructor(
        id: string,
        name: string
    ){
        this.id = id;
        this.name = name;
    }

    static getAll = async (): Promise<Array<Interest>> => {
        const query = await connection.query(
          `   
        SELECT
            id,
            name
        FROM app.interest
        WHERE deleted_at IS NULL`
        );
        return query.rows || [];
    };

    static getById = async (id: string): Promise<Array<Interest>> => {
        const query = await connection.query(
          `SELECT
                id, 
                name
            FROM app.interest
            WHERE id = $1 AND deleted_at IS NULL`,
          [id]
        );
        return query.rowCount ? query.rows[0] : null;
    };

    static deleteById = async (id: string): Promise<Interest | null> => {
        const response = await connection.query(
          `UPDATE app.interest 
                 SET deleted_at = now()
                 WHERE id = $1
                 RETURNING id, deleted_at AS "deletedAt"`,
          [id]
        );
        return response.rows[0] || null;
    };

}

export default Interest;
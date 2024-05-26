import connection from '../utils/lib/pg';

class CategoryInterest{
    id: string;
    name: string;
    id_interest: string;

    constructor(
        id: string,
        name: string,
        id_interest: string
    ){
        this.id= id;
        this.name= name;
        this.id_interest= id_interest;
    }

    static getAll = async (): Promise<Array<CategoryInterest>> => {
        const query = await connection.query(
          `   
        SELECT
            ci.id,
            ci.name,
            int.name AS "interes"
        FROM app.category_interest ci
        LEFT JOIN
            app.interest int ON int.id = ci.id_interest
        WHERE ci.deleted_at IS NULL`
        );
        return query.rows || [];
    };

    static getById = async (id: string): Promise<Array<CategoryInterest>> => {
        const query = await connection.query(
        `SELECT
            ci.id,
            ci.name,
            int.name AS "interes"
        FROM app.category_interest ci
        LEFT JOIN
            app.interest int ON int.id = ci.id_interest
        WHERE ci.id = $1 AND ci.deleted_at IS NULL`,
        [id]
        );
        return query.rowCount ? query.rows[0] : null;
    };

    static deleteById = async (id: string): Promise<CategoryInterest | null> => {
        const response = await connection.query(
          `UPDATE app.category_interest 
                 SET deleted_at = now()
                 WHERE id = $1
                 RETURNING id, deleted_at AS "deletedAt"`,
          [id]
        );
        return response.rows[0] || null;
    };
}
export default CategoryInterest;
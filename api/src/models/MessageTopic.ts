import connection from '../utils/lib/pg';

class MessageTopic{
    id_person: string;
    id_topic: string;
    content: string;
    id_file: string;
    id_imagen: string;

    constructor( id_person: string, id_topic: string, content: string, id_file: string, id_imagen: string)
    {
        this.id_person = id_person;
        this.id_topic = id_topic;
        this.content = content;
        this.id_file = id_file;
        this.id_imagen = id_imagen;
    }

    static getAll = async (): Promise<Array<MessageTopic>> => {
        const query = await connection.query(
          `   
        SELECT
            mtpc.id,
            mtpc.id_topic,
            mtpc.id_person,
            mtpc.content,
            per.name AS "creadorMensaje",
            mtpc.id_file,
            mtpc.id_imagen
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.delete_at IS NULL`
        );
        return query.rows || [];
    };

    static getById = async (id: string): Promise<Array<MessageTopic>> => {
        const query = await connection.query(
            `
        SELECT
            mtpc.id,
            mtpc.id_topic,
            mtpc.id_person,
            mtpc.content,
            per.name AS "creadorMensaje",
            mtpc.id_file,
            mtpc.id_imagen
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id = $1 AND mtpc.delete_at IS NULL`,
          [id]
        );
        return query.rowCount ? query.rows[0] : null;
    };

    static getByIdPerson = async (id_person: string): Promise<Array<MessageTopic>> => {
        const query = await connection.query(
            `
        SELECT
            mtpc.id,
            mtpc.id_topic,
            mtpc.id_person,
            mtpc.content,
            per.name AS "creadorMensaje",
            mtpc.id_file,
            mtpc.id_imagen
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id_person = $1 AND mtpc.delete_at IS NULL`,
          [id_person]
        );
        return query.rows || [];
    };

    static getByIdTopic = async (id_topic: string): Promise<Array<MessageTopic>> => {
        const query = await connection.query(
            `
        SELECT
            mtpc.id,
            mtpc.id_topic,
            mtpc.id_person,
            mtpc.content,
            per.name AS "creadorMensaje",
            mtpc.id_file,
            mtpc.id_imagen
        FROM app.message_topic mtpc
        LEFT JOIN
            app.person per ON per.id = mtpc.id_person
        WHERE mtpc.id_topic = $1 AND mtpc.delete_at IS NULL`,
          [id_topic]
        );
        return query.rows || [];
    };

    static createMessage = async (
        id_person: string,
        id_topic: string,
        content: string,
        id_file: string,
        id_imagen: string
      ) => {
        const response = await connection.query(
          `
            INSERT INTO app.message_topic (id_person, id_topic, content, id_file, id_imagen) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
          `,
          [id_person, id_topic, content, id_file, id_imagen]
        );
      
        return response.rowCount ? response.rows[0] : null;
    };

    static update = async (id: string, content: string): Promise<MessageTopic | null> => {
        const response = await connection.query(
            `UPDATE app.message_topic 
            SET content = $2 , updated_at = now()
            WHERE id = $1
            RETURNING content AS "contenido"`,
            [id, content]
        );
    
        return response.rows[0] || null;
    };

    static deleteById = async (id: string): Promise<MessageTopic | null> => {
        const response = await connection.query(
          `UPDATE app.message_topic 
                     SET delete_at = now()
                     WHERE id = $1
                     RETURNING id, delete_at AS "deleteAt"`,
          [id]
        );
        return response.rows[0] || null;
    };
    
}
export default MessageTopic;
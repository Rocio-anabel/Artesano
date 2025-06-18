import db from './db.js'

class Visibilidad{
    static async setAmigos([ID_amigos], ID_album){
        try {
            let placeholders;
            let values;
            if([ID_amigos].length > 1 ) {
                placeholders = ID_amigos.map(() => '(?, ?)').join(', ');
                values = ID_amigos.flatMap(id => [id, ID_album]);
            } else {
                placeholders = '(?, ?)';
                values = [ID_amigos, ID_album];
            }
            

            const sql = `INSERT INTO visibilidad (ID_amigo, ID_album) VALUES ${placeholders}`;

            const [result] = await db.query(sql, values);
                return result.affectedRows;

        } catch (error) {
            console.error('Error al configurar visibilidad', error);
            throw error;
        }
    }

}

export default Visibilidad;
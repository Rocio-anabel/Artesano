import db from './db.js'

class Amistades{
    static async crearAmistad({ID_Usuario, ID_amigo}){
        try {
            const sql = 'INSERT INTO amistades (ID_Usuario, ID_amigo) ' +
                        'VALUES (?,?)';
            const [result] = await db.query(sql, [ID_Usuario, ID_amigo]);
                return result.affectedRows;
        } catch (error) {
            console.error('Error al establecer la amistad', error);
            throw error;
        }
    }

    static async getAmigos(ID_Usuario){
        try {
            const sql = 'SELECT u.* FROM amistades a JOIN usuario u ON (u.ID_usuario = a.ID_Usuario AND a.ID_amigo = ?) '
              'OR (u.ID_usuario = a.ID_amigo AND a.ID_usuario = ?)';
            const [rows] = await db.query(sql, [ID_Usuario, ID_Usuario]);
                return rows;
        } catch (error) {
            console.error('Error al obtener amigos: ', error);
            throw error;
        }
    }
    static async sonAmigos(id1, id2) {
        try {
          const sql = `
            SELECT 1 
            FROM amistades 
            WHERE (ID_Usuario = ? AND ID_Amigo = ?) OR (ID_Usuario = ? AND ID_Amigo = ?)
          `;
          const [rows] = await db.query(sql, [id1, id2, id2, id1]);
          return rows.length > 0;
        } catch (error) {
          console.error('Error al verificar amistad:', error);
          throw error;
        }
  }
}

export default Amistades;
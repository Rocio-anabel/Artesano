import db from './db.js';

class Album{

    static async create({ID_Usuario, titulo, fechaCreacion}){
        const sql = "INSERT INTO album (ID_Usuario, titulo, fecha_creación) " +
                    "VALUES (?, ?, ?)";
        try {
            const [result] = await db.query(sql, [ID_Usuario, titulo, fechaCreacion]);
                return result.insertId;
        } catch (error) {
            console.error('Error al crear album:', error);
            throw error;
        }
    }
    static async getAlbumesVisibles(ID_Usuario) {
    try {
        const sql = 'SELECT a.*, u.nombre AS nombre_usuario, u.ID_usuario FROM album a  JOIN usuario u ON a.ID_usuario = u.ID_usuario ' +
            'WHERE a.ID_usuario = ? OR a.ID_album IN ( ' +
            'SELECT v.ID_album FROM visibilidad v WHERE v.ID_amigo = ?)';
        const [rows] = await db.query(sql, [ID_Usuario, ID_Usuario]);
        return rows;
    } catch (error) {
        console.error('Error al obtener albumes visibles: ', error);
        throw error;
    }
}
static async getAlbumesPorUsuario(ID_Usuario) {
    try {
        const sql = 'SELECT ID_album, titulo FROM album WHERE ID_usuario = ?';
        const [rows] = await db.query(sql, [ID_Usuario]);
        return rows;
    } catch (error) {
        console.error('Error al obtener los albumes: ', error);
        throw error;
    }
}

}

export default Album;
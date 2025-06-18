import db from './db.js';

class Notificacion{
    static async crear({ID_Receptor, ID_Emisor, tipo, mensaje, fecha_enviada}){
        try {
            const sql = 'INSERT INTO notificacion (ID_Receptor, ID_Emisor, tipo_notificacion, mensaje, fecha_enviada) ' +
                        'VALUES (?,?,?,?,?)';
            const [result] = await db.query(sql, [ID_Receptor, ID_Emisor, tipo, mensaje, fecha_enviada]);
                return result.insertId;
        } catch (error) {
            console.error('Error al crear notificacion:', error);
            throw error;
        }
    }

    static async leerNotificacion(ID_notificacion){
        try {
            const sql = 'UPDATE notificacion SET leido= 1 WHERE ID_Notificacion = ?';
            const [result] = await db.query(sql, [ID_notificacion]);
                return result.affectedRows;
        } catch (error) {
            console.error('Error al leer notificacion:', error);
            throw error;
        }
    }

    static async listarNotificaciones(ID_Receptor){
        try {
            const sql = 'SELECT * FROM notificacion WHERE ID_Receptor = ?'
            const [rows] = await db.query(sql, ID_Receptor);
            return rows;
        } catch (error) {
            console.error('Error al listar notificaciones:', error);
            throw error;
        }
    }
}

export default Notificacion;
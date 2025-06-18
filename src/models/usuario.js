import db from './db.js';

class Usuario{
    static async create({email, password, nombre, apellido, URL_avatar, fechaRegistro}){
        const sql = "INSERT INTO usuario(email, password, nombre, apellido, URL_avatar, fecha_registro) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
        try {
            const [result] = await db.query(sql, [email, password, nombre, apellido, URL_avatar, fechaRegistro]);
            return result.insertID;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
    static async getByEmail(email){
        const sql = "SELECT * FROM usuario WHERE email = ?"
        try {
            const [rows] = await db.query(sql, [email]);
            const usuario = rows[0];
            return usuario;
        } catch (error) {
            console.error('Error al buscar el usuario: ', error);
            throw error;
        }
    }
    static async getNameByID(ID_Usuario){
        try {
            const sql = 'SELECT nombre  FROM usuario WHERE ID_Usuario = ?';
            const [rows] = await db.query(sql, [ID_Usuario]);
            const nombre = rows[0];
            return nombre;
        } catch (error) {
            console.error('Error al recuperar el nombre de usuario: ', error);
            throw error;
        }
    };

    static async buscarPorNombre(nombre) {
        try {
            const sql = `SELECT * FROM usuario WHERE CONCAT(nombre, ' ', apellido) LIKE ?`;
            const [rows] = await db.query(sql, [`%${nombre}%`]);
            return rows;
        } catch (error) {
            console.error('Error al recuperar usuario por nombre: ', error);
            throw error;
        }
    }
    static async buscarPorId(id) {
        try {
          const sql = 'SELECT * FROM usuario WHERE ID_Usuario = ?';
          const [rows] = await db.query(sql, [id]);
          return rows.length > 0 ? rows[0] : null;
        } catch (error) {
          console.error('Error al recuperar usuario por id: ', error);
          throw error;
        }
}

}

export default Usuario;
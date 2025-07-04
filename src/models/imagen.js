import db from './db.js';

class Imagen{
    static async create({URL_img, caption, fechaSubida, ID_album}){
        const sql = 'INSERT INTO imagen (URL_img, caption, fecha_subida, ID_album) ' +
                    'VALUES (?, ?, ?, ?)';
        try {
            const [result] = await db.query(sql, [URL_img, caption, fechaSubida, ID_album]);
            return result.insertId;
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw error;
        }
    }
    static async countByAlbum(ID_album) {
    const sql = "SELECT COUNT(*) AS total FROM imagen WHERE ID_album = ?";
    try {
      const [rows] = await db.query(sql, [ID_album]);
      return rows[0].total;
    } catch (error) {
      console.error('Error al contar imágenes del álbum:', error);
      throw error;
    }
  }
  static async getImagenesByAlbum(ID_album){
    const sql = 'SELECT * FROM imagen WHERE ID_album = ?'
    try {
      const [rows] = await db.query(sql, [ID_album]);
      return rows;
    } catch (error) {
      console.error('Error al obtener imagenes por album: ', error);
      throw error;
    }
  }
}

export default Imagen;


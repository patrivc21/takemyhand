
import { DB } from "../config/typeorm";
import { ChatPrivado } from "../entities/ChatPrivado";
import { Usuarios } from "../entities/Usuarios";

export const addChat = async (chat: ChatPrivado): Promise<boolean> => {
    let datos = {
        fecha_hora: new Date(),
        id_emisor: chat.id_emisor,
        id_receptor: chat.id_receptor,
        mensaje: chat.mensaje,
      };

    let res = await DB.getRepository(ChatPrivado).save(datos);
    return res != null;
}


export const getOneChat = async (id_emisor: number, id_receptor: number): Promise<any[]> => {
    const res = await DB.getRepository(ChatPrivado).find({
        where: [
            { id_emisor: id_emisor, id_receptor: id_receptor },
            { id_emisor: id_receptor, id_receptor: id_emisor }
        ],
    });

    return res;
}

export const buscadorUsuarios = async (texto: string): Promise<any> => {
    const res = await DB.getRepository(Usuarios).find({
        where: [
            { nombre: texto },         // Busca por nombre
            { apellidos: texto },      // O busca por apellidos
            { nombre: texto, apellidos: texto } // O busca por ambos
        ],
    });

    return res;
}


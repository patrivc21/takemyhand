import OpenAI from "openai";
import configEnv from "../config/config";
import { DB } from "../config/typeorm";
import { ChatPrivado } from "../entities/ChatPrivado";
import { Usuarios } from "../entities/Usuarios";

const openai = new OpenAI({
    apiKey: configEnv.API_KEY,
    organization: configEnv.ORGANIZATION
});

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

export const prueba = async (texto: string): Promise<any> => {

    //conexión a chatgpt para obtener los detalles
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', 
            content: '¿Este texto es aceptable en una página para la prevención del suicido?' + texto + '"' }],
        model: "gpt-3.5-turbo"
    });

    const data = chatCompletion.choices[0].message.content;

    return data;
}
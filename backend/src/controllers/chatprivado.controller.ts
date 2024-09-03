import { ChatPrivado } from "../entities/ChatPrivado";
import RespGeneric from "../models/RespGeneric";
import { addChat, buscadorUsuarios, getOneChat, prueba } from "../services/chatprivado.service";
import { Request, Response } from 'express';

export const addChatPrivado = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let chat = req.body;
        let result = await addChat(chat);
        resp.msg = "Evento anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getOneChatPrivado = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getOneChat(body.id_emisor, body.id_receptor);
        resp.data = result;
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}

export const buscadorC = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await buscadorUsuarios(body.texto);
        resp.data = result;
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}

export const pruebaC = async (req: any, res: any) => {
    let resp = new RespGeneric();
    let texto = req.body.texto;
   
    try {
        let datos = await prueba(texto);
        resp.data = {datos};
        resp.cod = 200;
        res.json(resp);
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        res.json(resp);
    }
}


export default {addChatPrivado, getOneChatPrivado, pruebaC, buscadorC};
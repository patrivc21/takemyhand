import { ChatPrivado } from "../entities/ChatPrivado";
import RespGeneric from "../models/RespGeneric";
import { addChat, getOneChat } from "../services/chatprivado.service";
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


export default {addChatPrivado, getOneChatPrivado};
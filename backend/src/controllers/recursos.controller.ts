import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { getRecursos } from '../services/recursos.service';
const fs = require('fs');



export const getAllRecursos = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let recurso = await getRecursos();
        resp.data = {recurso: recurso};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}


export default {getAllRecursos };
import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Profesionales } from '../entities/Profesional';
import { addProfesional, getAllProfesionales, getOneProfesional, updateProfesionalesService, deleteProfesionalesService, addPublicacion, addArchivoPublicacion, getOnePublicacion, getAllPublicaciones, deletePublicacion, buscarPublis, addRecursos, addArchivosRecursos, getCiudades, getProfByCiudad} from '../services/profesional.service'

export const addNewProfesional = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let profesional : Profesionales = req.body as Profesionales;
        let result = await addProfesional(profesional);
        resp.msg = "Profesional anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getOneProfesionalController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getOneProfesional(body.id);
        if(result) result.password = '';
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllProfesionalesControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getAllProfesionales();
        if (result) {
            result.forEach(profesional => {
                profesional.password = '';
            });
        }
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}


export const updateProfesional = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let prof : Profesionales = req.body as Profesionales;
        let result = await updateProfesionalesService(prof);
        resp.cod = result ? 200 : 400;
        resp.data = {profesionales: result};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp)
}


export const deleteProfesionalesController = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        const ids: number[] = req.body.ids;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. Please provide an array of IDs.' });
        }

        let result = await deleteProfesionalesService(ids);
        resp.cod = result ? 200 : 400;
        resp.data = {result};
        resp.msg = "Profesionales eliminados con exito."

    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        resp.msg = "Error al eliminar profesionales"
    }
};


export const addPublicacionC = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let infor = req.body
    const archivos_adjuntos = (req as any).files;
    try {
        let datos = {infor, archivos_adjuntos}
        console.log(datos)
        
        let publi = await addPublicacion(infor);
        let saveFiles = true;
        
        if (archivos_adjuntos) {
            saveFiles = await addArchivoPublicacion(archivos_adjuntos, publi.id);
        }
        resp.data = { saveFiles: saveFiles };
        resp.cod = 200;
    } catch (error) {
        console.log(error as string);
        resp.msg = error as string;
        resp.cod = 500;
    }
    return res.json(resp);
}


export const getOnePublicacionController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getOnePublicacion(body.id);
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllPublicacionesControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getAllPublicaciones();
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}



export const deletePublicacionesController = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        const ids: number[] = req.body.ids;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. Please provide an array of IDs.' });
        }

        let result = await deletePublicacion(ids);
        resp.cod = result ? 200 : 400;
        resp.data = {result};
        resp.msg = "Publicaciones de profesionales eliminados con exito."

    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        resp.msg = "Error al eliminar publicaciones de profesionales "
    }
};

export const buscarC = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await buscarPublis(body.fechaInicio, body.fechaFin);
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const addRecursosC = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let infor = req.body
    const nombre_archivo = (req as any).files;
    try {
        let datos = {infor, nombre_archivo}
        console.log(datos)
        
        let recursoGuardado = await addRecursos(infor);
        let saveFiles = true;
        
        if (nombre_archivo && recursoGuardado) {
            saveFiles = await addArchivosRecursos(nombre_archivo, recursoGuardado.id);
        }


        resp.data = { saveFiles: saveFiles };
        resp.cod = 200;
    } catch (error) {
        console.log(error as string);
        resp.msg = error as string;
        resp.cod = 500;
    }
    return res.json(resp);
}

export const getAllCiudades = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getCiudades();
        resp.data = result;
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getProfByCiudadC = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getProfByCiudad(body.ciudad);
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}

export default { addNewProfesional, getOneProfesionalController, getAllProfesionalesControllers, updateProfesional, deleteProfesionalesController, 
    addPublicacionC, getOnePublicacionController, getAllPublicacionesControllers, deletePublicacionesController, buscarC, addRecursosC,
    getAllCiudades, getProfByCiudadC};
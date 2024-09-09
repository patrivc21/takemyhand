import { Usuarios } from "../entities/Usuarios";
import { DB } from "../config/typeorm";
import { Not, SelectQueryBuilder } from "typeorm";
import { RolUsuarios } from "../entities/RolUsuarios";
import { HiloUsuarios } from "../entities/HiloUsuarios";
import { ArchivosHiloUsuario } from "../entities/ArchivosHiloUsuarios";
import path from "path";
import { RespuestaHiloUsuarios } from "../entities/RespuestaUsuarios";
import { validarContenido } from "../helpers/validatorcontenido.helper";

export const addUsuarios = async (usuarios: Usuarios): Promise<Usuarios> => {
    let res = await DB.getRepository(Usuarios).save(usuarios);
    return res;
}

export const getOneUser = async (id: number): Promise<Usuarios | null> => {
    let user = await DB.getRepository(Usuarios).findOne({
        where: [
            { id: id }]
    });

    return user;
}

export const getAllUsers = async ():Promise<Usuarios[]> => {
    let users = await DB.getRepository(Usuarios).find();
    return users;
}

export const getUserByEmail = async (email: string): Promise<Usuarios | null> => {
    const user = await DB.getRepository(Usuarios)
      .createQueryBuilder('u')
      .leftJoinAndSelect('profesionales', 'p', 'p.id_usuario = u.id')
      .leftJoinAndSelect('pacientes', 'pa', 'pa.id_usuario = u.id')
      .where('u.email = :email', { email })
      .getOne();
  
    return user;
  }

export const getAllRoles = async ():Promise<RolUsuarios[]> => {
    let roles = await DB.getRepository(RolUsuarios).find();
    return roles;
}


export const updateUsuariosService = async(usuario: any): Promise<boolean> => {
    let userToUpdate = await DB.getRepository(Usuarios).findOneBy({email: usuario.email});
    let resp = null;
    if(userToUpdate){
        Object.assign(userToUpdate, usuario);
        resp = await DB.getRepository(Usuarios).save(userToUpdate);
    }
    return resp != null;
}

export const getAllUsersExceptMe = async (id: number): Promise<Usuarios[]> => {
    let users = await DB.getRepository(Usuarios).find({
        where: {
            id: Not(id) 
        }
    });
    return users;
}

  

export const addPublicacion = async (publicacion: any): Promise<any> => {
    // Validar el contenido del mensaje
    if (!validarContenido(publicacion.mensaje)) {
        throw new Error('El mensaje contiene contenido inapropiado.');
    }

    let datos = {
        fecha_hora: new Date(),
        titulo: publicacion.titulo,
        mensaje: publicacion.mensaje,
        id_usuario: publicacion.id_usuario,
        archivo_adjunto: ''
    };

    let res = await DB.getRepository(HiloUsuarios).save(datos);
    return res;
}


export const addArchivoPublicacion = async (publi: any, id: number): Promise<boolean> => {
    let filesSaved;
    
      for (const key in publi) {
          if (publi.hasOwnProperty(key)) {
              const file = publi[key];
              let archivo_com = {
                  id_hilo: id,
                  archivo_adjunto: file ? path.basename(file.path) : '',
              };
    
              filesSaved = await DB.getRepository(ArchivosHiloUsuario).save(archivo_com);
          }
      }
    
      return filesSaved != null;
}

export const deletePublicacion = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(HiloUsuarios).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
        return false;
    }
}

export const updatePublicacion = async(publicacion: any): Promise<boolean> => {
    let publicacionToUpdate = await DB.getRepository(HiloUsuarios).findOneBy({id: publicacion.id});
    let resp = null;
    if(publicacionToUpdate){
        Object.assign(publicacionToUpdate, publicacion);
        resp = await DB.getRepository(HiloUsuarios).save(publicacionToUpdate);
    }
    return resp != null;
}

export const getAllPublicaciones = async ():Promise<HiloUsuarios[]> => {
    let res = await DB.getRepository(HiloUsuarios)
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.usuario', 'p')
    .leftJoinAndSelect('h.archivos', 'a')
    .orderBy('h.fecha_hora', 'DESC')
    .getMany();

    return res;
}

export const getOnePublicacion= async (id: number): Promise<HiloUsuarios[]> => {
    let res = await DB.getRepository(HiloUsuarios)
        .createQueryBuilder('h')
        .leftJoinAndSelect('h.usuario', 'p')
        .leftJoinAndSelect('h.archivos', 'a')
        .where('h.id = :id', { id })
        .getMany();
        
    return res;
}


export const buscarPublis = async (fechaInicio?: string, fechaFin?: string): Promise<any[]> => {
    const query = await DB.getRepository(HiloUsuarios)
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.usuario', 'p')
    .leftJoinAndSelect('h.archivos', 'a')
  
    if (fechaInicio) {
      query.andWhere('h.fecha_hora >= :fechaInicio', { fechaInicio });
    }
  
    if (fechaFin) {
        const adjustedFechaFin = new Date(fechaFin);
        adjustedFechaFin.setHours(23, 59, 59, 999);
        query.andWhere('h.fecha_hora <= :fechaFin', { fechaFin: adjustedFechaFin.toISOString() });
    }

    query.orderBy('h.fecha_hora', 'DESC')
  
    let res = await query.getMany();
    return res;
  };
    

  export const addRespuestaPublicacion = async (publicacion: any): Promise<any> => {
     // Validar el contenido del mensaje
     if (!validarContenido(publicacion.mensaje)) {
        throw new Error('El mensaje contiene contenido inapropiado.');
    }
    
    let datos = {
      fecha_hora: new Date(),
      titulo: publicacion.titulo,
      mensaje: publicacion.mensaje,
      id_usuario: publicacion.id_usuario,
      archivo_adjunto: '',
      id_hilo: publicacion.id_hilo
    };

    let res = await DB.getRepository(RespuestaHiloUsuarios).save(datos);
    console.log(res)
    return res;
}

  export const addArchivoRespuestaPublicacion = async (plan: any, id: number, id_resp: number): Promise<boolean> => {
    let filesSaved;
    
      for (const key in plan) {
          if (plan.hasOwnProperty(key)) {
              const file = plan[key];
              let archivo_com = {
                  id_hilo: id,
                  id_respuesta: id_resp,
                  archivo_adjunto: file ? path.basename(file.path) : '',
              };
    
              filesSaved = await DB.getRepository(ArchivosHiloUsuario).save(archivo_com);
          }
      }
    
      return filesSaved != null;
}

export const getRespuestas = async (id: number): Promise<any[]> => {
    const respuestas = await DB.getRepository(RespuestaHiloUsuarios)
        .createQueryBuilder('rp')
        .leftJoinAndSelect('rp.usuario', 'p')
        .leftJoinAndSelect('rp.archivos', 'a')
        .where('rp.id_hilo = :id', { id })
        .orderBy('rp.fecha_hora', 'DESC')
        .getMany();

    return respuestas;
}

export const getAllPublicacionesUser = async (id_usuario: number):Promise<HiloUsuarios[]> => {
    let res = await DB.getRepository(HiloUsuarios)
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.usuario', 'p')
    .leftJoinAndSelect('h.archivos', 'a')
    .where('h.id_usuario = :id_usuario', { id_usuario })
    .orderBy('h.fecha_hora', 'DESC')
    .getMany();

    return res;
}

export const deleteArchivosPublicacion = async (id_hilo: number): Promise<boolean> => {
    try {
        const archivos = await DB.getRepository(ArchivosHiloUsuario).find({ where: { id_hilo } });

        if (archivos.length > 0) {
            for (const archivo of archivos) {
                // Eliminar el archivo de la base de datos
                await DB.getRepository(ArchivosHiloUsuario).remove(archivo);
            }
        }

        return true;
    } catch (error) {
        console.error('Error eliminando archivos:', error);
        return false;
    }
};

export const editPublicacion = async (id: number, publicacion: any, archivos_adjuntos: any): Promise<any> => {
    // Buscar la publicación existente
    let publicacionExistente = await DB.getRepository(HiloUsuarios).findOneBy({ id });

    if (!publicacionExistente) {
        throw new Error('La publicación no existe.');
    }

    // Validar el contenido del mensaje
    if (publicacion.mensaje && !validarContenido(publicacion.mensaje)) {
        throw new Error('El mensaje contiene contenido inapropiado.');
    }

    // Actualizar los campos
    publicacionExistente.titulo = publicacion.titulo || publicacionExistente.titulo;
    publicacionExistente.mensaje = publicacion.mensaje || publicacionExistente.mensaje;
    publicacionExistente.fecha_hora = new Date();

    // Guardar la publicación actualizada
    let resultado = await DB.getRepository(HiloUsuarios).save(publicacionExistente);

    // Eliminar archivos adjuntos antiguos
    let archivosBorrados = await deleteArchivosPublicacion(id);

    if (archivosBorrados && archivos_adjuntos && archivos_adjuntos.length > 0) {
        // Agregar nuevos archivos
        await addArchivoPublicacion(archivos_adjuntos, id);
    }

    return resultado;
};


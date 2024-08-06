import { Profesionales } from "../entities/Profesional";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import path from "path";
import { HiloProfesionales } from "../entities/HiloProfesionales";
import { ArchivosHiloProf } from "../entities/ArchivosHiloProf";
import { Recursos } from "../entities/Recursos";
import { ArchivosRecursos } from "../entities/ArchivosRecursos";

export const addProfesional = async (admin: Profesionales): Promise<boolean> => {
    let res = await DB.getRepository(Profesionales).save(admin);
    return res != null;
}

export const getOneProfesional = async (id: number): Promise<Profesionales | null> => {
    let res = await DB.getRepository(Profesionales).findOne({
        where: [
            { id: id }]
    });

    return res;
}

export const getAllProfesionales = async ():Promise<Profesionales[]> => {
    let res = await DB.getRepository(Profesionales).find();
    return res;
}

export const updateProfesionalesService = async(profesional: Profesionales): Promise<boolean> => {
    let profToUpdate = await DB.getRepository(Profesionales).findOneBy({id: profesional.id});
    let resp = null;
    if(profToUpdate){
        Object.assign(profToUpdate, profesional);
        resp = await DB.getRepository(Profesionales).save(profToUpdate);
    }
    return resp != null;
}

export const deleteOneProfesionalesService = async(id: number): Promise<boolean> => {
    let profToEliminate = await DB.getRepository(Profesionales).findOneBy({id: id});
    let resp = null;
    if(profToEliminate){
        resp = await DB.getRepository(Profesionales).remove(profToEliminate);
    }
    return resp != null;
}

export const deleteProfesionalesService = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(Profesionales).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar los profesionales profesionales:', error);
        return false;
    }
}

export const addPublicacion = async (publicacion: any): Promise<any> => {
    let datos = {
      fecha_hora: new Date(),
      titulo: publicacion.titulo,
      mensaje: publicacion.mensaje,
      id_profesional: publicacion.id_profesional,
      archivo_adjunto: ''
    };

    let res = await DB.getRepository(HiloProfesionales).save(datos);
    return res;
}

export const addArchivoPublicacion = async (plan: any, id: number): Promise<boolean> => {
    let filesSaved;
    
      for (const key in plan) {
          if (plan.hasOwnProperty(key)) {
              const file = plan[key];
              let archivo_com = {
                  id_hilo: id,
                  archivo_adjunto: file ? path.basename(file.path) : '',
              };
    
              filesSaved = await DB.getRepository(ArchivosHiloProf).save(archivo_com);
          }
      }
    
      return filesSaved != null;
}
    

export const deletePublicacion = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(HiloProfesionales).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
        return false;
    }
}

export const getAllPublicaciones = async ():Promise<any[]> => {
    let res = await DB.getRepository(HiloProfesionales)
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.profesional', 'p')
    .leftJoinAndSelect('h.archivos', 'a')
    .orderBy('h.fecha_hora', 'DESC')
    .getMany();

    return res;
}

export const getOnePublicacion= async (id: number): Promise<HiloProfesionales[]> => {
    let res = await DB.getRepository(HiloProfesionales)
        .createQueryBuilder('h')
        .leftJoinAndSelect('h.profesional', 'p')
        .leftJoinAndSelect('h.archivos', 'a')
        .where('h.id = :id', { id })
        .getMany();
        
    return res;
}

export const buscarPublis = async (fechaInicio?: string, fechaFin?: string): Promise<any[]> => {
    const query = await DB.getRepository(HiloProfesionales)
      .createQueryBuilder('h')
      .leftJoinAndSelect('h.profesional', 'p')
      .leftJoinAndSelect('h.archivos', 'a');
  
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

  

export const addRecursos = async (recursos: any): Promise<any> => {
    let datos = {
        titulo: recursos.titulo,
        contenido: recursos.contenido,
        archivo_adjunto: '',
        tipo: ''
      };

    let res = await DB.getRepository(Recursos).save(datos);
    return res;
}

export const addArchivosRecursos = async (files: any, id:number): Promise<boolean> => {
    let filesSaved;

	for (const key in files) {
		if (files.hasOwnProperty(key)) {
			const file = files[key];
			let tipoArchivo = file ? path.basename(file.type) : '';
			if (tipoArchivo === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
				tipoArchivo = 'xlsx';
			}

			let datos = {
                id_recurso: id,
				nombre_archivo: file ? path.basename(file.path) : '',
				tipo: tipoArchivo,
			};

			filesSaved = await DB.getRepository(ArchivosRecursos).save(datos);
		}
	}

    return filesSaved != null;
}
  

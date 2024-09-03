import Cuestionario  from "../models/Cuestionario";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import { PlanSeguridad } from "../entities/PlanSeguridad";
import path from "path";
import { ArchivosPlan } from "../entities/ArchivosPlan";
import { validarContenido } from "../helpers/validatorcontenido.helper";
  

export const addPlanSeguridad = async (plan: any): Promise<any> => {
  // Validar el contenido del plan
  if (!validarContenido(plan.hobbies) || !validarContenido(plan.lugares) || !validarContenido(plan.personas)) {
    throw new Error('El mensaje contiene contenido inapropiado.');
}

  let datos = {
    id_usuario: plan.id_usuario,
    lugares: plan.lugares,
    hobbies: plan.hobbies,
    personas: plan.personas,
    emails: plan.emails,
    nombre_archivo: ''
  };

  let res = await DB.getRepository(PlanSeguridad).save(datos);
  return res;
}

export const addArchivo = async (plan: any, id: number, id_usuario: number): Promise<boolean> => {
let filesSaved;

  for (const key in plan) {
      if (plan.hasOwnProperty(key)) {
          const file = plan[key];
          let archivo_com = {
              id_plan: id,
              nombre_archivo: file ? path.basename(file.path) : '',
              id_usuario: id_usuario
          };

          filesSaved = await DB.getRepository(ArchivosPlan).save(archivo_com);
      }
  }

  return filesSaved != null;
}


export const getOnePlan = async (id_usuario: number): Promise<any> => {
  let res = await DB.getRepository(PlanSeguridad)
    .createQueryBuilder('p')
    .leftJoin('archivos_plan', 'a', 'a.id_plan = p.id')
    .where('p.id_usuario = :id_usuario', { id_usuario })
    .groupBy('p.id')
    .addSelect('GROUP_CONCAT(a.nombre_archivo)', 'archivos') 
    .getRawMany();

  return res;
}

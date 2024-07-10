import Cuestionario  from "../models/Cuestionario";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import { PlanSeguridad } from "../entities/PlanSeguridad";
import path from "path";
  

export const addPlanSeguridad = async (plan: any): Promise<any> => {
    let datos = {
      id_usuario: plan.id_usuario,
      lugares: plan.lugares,
      hobbies: plan.hobbies,
      personas: plan.personas,
      nombre_archivo: ''
    };

    let res = await DB.getRepository(PlanSeguridad).save(datos);
    return res;
  }

export const addArchivo = async (plan: any, id: number): Promise<boolean> => {
let filesSaved;

    for (const key in plan) {
        if (plan.hasOwnProperty(key)) {
            const file = plan[key];
            let tipoArchivo = file ? path.basename(file.type) : '';
            if (tipoArchivo === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Cambiar el tipo a "xlsx"
            tipoArchivo = 'xlsx';
            }

            let archivo_com = {
                id: id,
                nombre_archivo: file ? path.basename(file.path) : '',
            };

            filesSaved = await DB.getRepository(PlanSeguridad).save(archivo_com);
        }
    }

    return filesSaved != null;
}

export const getOnePlan = async (id_usuario: number): Promise<PlanSeguridad | null> => {
  let res = await DB.getRepository(PlanSeguridad).findOne({
      where: [
          { id_usuario: id_usuario }]
  });

  return res;
}

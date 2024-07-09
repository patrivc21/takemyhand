import Cuestionario  from "../models/Cuestionario";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import { PlanSeguridad } from "../entities/PlanSeguridad";
import path from "path";

export const calcularResultadoRiesgoDespresion = (data: Cuestionario) => {
    let score = 0;
  
    // Sexo
    score += data.sexo === 'Hombre' ? 1 : 0;
  
    // Duración de la fase actual
    score += Math.min(data.semanasDuracion, 100) * 0.1;
  
    // Número de visitas al psiquiatra
    score += Math.min(data.visitasPsiquiatra, 100) * 0.1;
  
    // Tentativas suicidas previas
    switch (data.tentativasPrevias) {
      case 'No ha tenido':
        score += 0;
        break;
      case 'Una tentativa manipuladora, no seria':
        score += 1;
        break;
      case 'Tres o más tentativas manipuladoras o una seria':
        score += 2;
        break;
      case 'Dos o más tentativas serias en el pasado':
        score += 3;
        break;
    }
  
    // Ideas suicidas actuales
    switch (data.ideasSuicidas) {
      case 'No ha tenido o tiene miedo a suicidarse sin desearlo':
        score += 0;
        break;
      case 'La vida le parece que no es digna de ser vivida':
        score += 1;
        break;
      case 'Piensa que lo mejor sería estar muerto':
        score += 2;
        break;
      case 'Ha pensado quitarse la vida':
        score += 3;
        break;
    }
  
    // Transformar la puntuación a una probabilidad
    // Esto es un ejemplo, la fórmula exacta puede variar
    const logOdds = Math.log(score + 1); // Usamos +1 para evitar log(0)
    const riesgoSuicida = 1 / (1 + Math.exp(-logOdds));
  
    return riesgoSuicida;
  }
  

  export const calcularResultadoPlutchik = (respuestas: any) => {
    // Las respuestas deben ser un array de 15 elementos con valores 'SI' o 'NO'
    if (respuestas.length !== 15) {
        throw new Error("Se requieren exactamente 15 respuestas.");
    }

    let puntuacionTotal = 0;

    // Sumar las puntuaciones de los 15 ítems
    respuestas.forEach((respuesta: string) => {
        if (respuesta !== 'SI' && respuesta !== 'NO') {
        throw new Error("Cada respuesta debe ser 'SI' o 'NO'.");
        }
        if (respuesta === 'SI') {
        puntuacionTotal += 1;
        }
    });

    return puntuacionTotal;
  }
  
  export const addPlanSeguridad = async (plan: any): Promise<boolean> => {
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
            nombre_archivo: file ? path.basename(file.path) : '',
          };

          filesSaved = await DB.getRepository(PlanSeguridad).save(archivo_com);
        }
      }

      return filesSaved != null;
}

export const getOnePlan = async (id: number): Promise<PlanSeguridad | null> => {
  let res = await DB.getRepository(PlanSeguridad).findOne({
      where: [
          { id: id }]
  });

  return res;
}

import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import { Recursos } from "../entities/Recursos";
  

export const getRecursos = async (): Promise<any[]> => {
    const recursos = await DB.getRepository(Recursos)
        .createQueryBuilder('r')
        .leftJoinAndSelect('r.archivos', 'ar')
        .orderBy('r.id', 'DESC')
        .getMany();
    return recursos;
}


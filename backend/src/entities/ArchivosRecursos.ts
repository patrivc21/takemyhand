import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { PlanSeguridad } from './PlanSeguridad';
import { Recursos } from './Recursos';

@Entity({ name: 'archivos_recursos' })
export class ArchivosRecursos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'longtext'})
  nombre_archivo!: string;

  @Column()
  tipo!: string;

  @Column()
  id_recurso!: number;

  @ManyToOne(() => Recursos, recurso => recurso.id)
  @JoinColumn({ name: 'id_recurso' })
  recurso!: Recursos;

}

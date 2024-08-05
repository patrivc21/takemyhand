import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { PlanSeguridad } from './PlanSeguridad';
import { HiloProfesionales } from './HiloProfesionales';

@Entity({ name: 'archivos_hilo_prof' })
export class ArchivosHiloProf {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  archivo_adjunto!: string;

  @Column()
  id_hilo!: number;

  @ManyToOne(() => HiloProfesionales, hilo => hilo.id)
  @JoinColumn({ name: 'id_hilo' })
  hilo!: HiloProfesionales;

}

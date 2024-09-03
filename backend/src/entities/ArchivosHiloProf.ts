import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { PlanSeguridad } from './PlanSeguridad';
import { HiloProfesionales } from './HiloProfesionales';
import { RespuestaHiloProfesionales } from './RespuestaProfesionales';

@Entity({ name: 'archivos_hilo_prof' })
export class ArchivosHiloProf {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'longtext'})
  archivo_adjunto!: string;

  @Column()
  id_hilo!: number;

  @ManyToOne(() => HiloProfesionales, hilo => hilo.id)
  @JoinColumn({ name: 'id_hilo' })
  hilo!: HiloProfesionales;

  @Column({nullable: true })
  id_respuesta!: number;

  @ManyToOne(() => RespuestaHiloProfesionales, respuesta => respuesta.id)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta!: RespuestaHiloProfesionales;

}

import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { PlanSeguridad } from './PlanSeguridad';
import { HiloProfesionales } from './HiloProfesionales';
import { HiloUsuarios } from './HiloUsuarios';

@Entity({ name: 'archivos_hilo_usuarios' })
export class ArchivosHiloUsuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  archivo_adjunto!: string;

  @Column()
  id_hilo!: number;

  @ManyToOne(() => HiloUsuarios, hilo => hilo.id)
  @JoinColumn({ name: 'id_hilo' })
  hilo!: HiloUsuarios;

}

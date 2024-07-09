import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';

@Entity({ name: 'plan_seguridad' })
export class PlanSeguridad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre_archivo!: string;
}

import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { PlanSeguridad } from './PlanSeguridad';

@Entity({ name: 'archivos_plan' })
export class ArchivosPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre_archivo!: string;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @Column()
  id_plan!: number;

  @ManyToOne(() => PlanSeguridad, plan => plan.id)
  @JoinColumn({ name: 'id_plan' })
  plan!: PlanSeguridad;

}

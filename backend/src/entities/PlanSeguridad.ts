import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';

@Entity({ name: 'plan_seguridad' })
export class PlanSeguridad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lugares!: string;

  @Column()
  personas!: string;

  @Column()
  emails!: string;

  @Column()
  hobbies!: string;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

}

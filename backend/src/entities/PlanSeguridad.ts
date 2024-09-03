import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';
import { ArchivosPlan } from './ArchivosPlan';

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

  @OneToMany(() => ArchivosPlan, archivo => archivo.plan) 
    archivos!: ArchivosPlan[];

}

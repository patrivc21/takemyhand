import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolPaciente } from './RolPacientes';
import { Usuarios } from './Usuarios';
import { Profesionales } from './Profesional';

@Entity({ name: 'pacientes' })
export class Pacientes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  activo!: boolean;

  @Column()
  rolpaciente!: number;

  @ManyToOne(() => RolPaciente, rolPaciente => rolPaciente.id)
  @JoinColumn({ name: 'rolpaciente' })
  rolPaciente!: RolPaciente;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @Column({type: 'double'})
  resultado_formulario!: number;

  @Column({nullable: true })
  id_profesional_asociado!: number;

  @ManyToOne(() => Profesionales, prof => prof.id)
  @JoinColumn({ name: 'id_profesional_asociado' })
  profesional_asociado!: Profesionales;
}

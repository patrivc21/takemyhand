import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolPaciente } from './RolPacientes';
import { Usuarios } from './Usuarios';

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

  @Column()
  resultado_formulario!: number;
}

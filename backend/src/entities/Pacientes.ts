import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolPaciente } from './RolPacientes';

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
  activo!: number;

  @Column()
  rol!: number;

  @ManyToOne(() => RolPaciente, rolPaciente => rolPaciente.id)
  @JoinColumn({ name: 'rol' })
  rolPaciente!: RolPaciente;
}

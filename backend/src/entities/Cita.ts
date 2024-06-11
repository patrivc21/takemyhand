import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesionales } from './Profesional';
import { Pacientes } from './Pacientes';

@Entity({ name: 'cita' })
export class Cita {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_profesional!: number;

  @Column()
  id_paciente!: number;

  @Column()
  tema!: string;

  @Column()
  duracion!: number;

  @Column()
  fecha_hora_inicio!: Date;

  @Column()
  fecha_hora_fin!: Date;

  @ManyToOne(() => Profesionales, profesional => profesional.id)
  @JoinColumn({ name: 'id_profesional' })
  profesional!: Profesionales;

  @ManyToOne(() => Pacientes, paciente => paciente.id)
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Pacientes;
}

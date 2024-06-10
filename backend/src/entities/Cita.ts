import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesionales } from './Profesional';
import { Pacientes } from './Pacientes';

@Entity({ name: 'cita' })
export class Cita {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  id_profesional!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  id_paciente!: number;

  @Column({ type: 'text', nullable: false, collation: 'utf8mb4_general_ci' })
  tema!: string;

  @Column({ type: 'double', nullable: false, default: 0 })
  duracion!: number;

  @Column({ type: 'datetime', nullable: false, default: () => "'0000-00-00 00:00:00'" })
  fecha_hora_inicio!: Date;

  @Column({ type: 'datetime', nullable: false, default: () => "'0000-00-00 00:00:00'" })
  fecha_hora_fin!: Date;

  @ManyToOne(() => Profesionales, profesional => profesional.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_profesional' })
  profesional!: Profesionales;

  @ManyToOne(() => Pacientes, paciente => paciente.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Pacientes;
}

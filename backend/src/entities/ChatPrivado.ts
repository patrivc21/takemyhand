import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesionales } from './Profesional';
import { Pacientes } from './Pacientes';

@Entity({ name: 'chat_privado' })
export class ChatPrivado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: true })
  id_profesional!: number;

  @Column({ type: 'int', nullable: true })
  id_paciente!: number;

  @Column({ type: 'double', nullable: true })
  duracion!: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_hora_inicio!: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_hora_fin!: Date;

  @ManyToOne(() => Profesionales, profesional => profesional.id)
  @JoinColumn({ name: 'id_profesional' })
  profesional!: Profesionales;

  @ManyToOne(() => Pacientes, paciente => paciente.id)
  @JoinColumn({ name: 'id_paciente' })
  paciente!: Pacientes;
}

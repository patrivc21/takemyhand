import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Profesionales } from './Profesional';

@Entity({ name: 'hilo_profesionales' })
export class HiloProfesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  mensaje!: string;

  @Column()
  archivo_adjunto!: string;

  @Column()
  fecha_hora!: Date;

  @Column()
  id_profesional!: number;

  @ManyToOne(() => Profesionales, profesional => profesional.id)
  @JoinColumn({ name: 'id_profesional' })
  profesional!: Profesionales;
}

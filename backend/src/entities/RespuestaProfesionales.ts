import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesionales } from './Profesional'; 
import { HiloProfesionales } from './HiloProfesionales'; 

@Entity({ name: 'respuesta_hilo_profesionales' })
export class RespuestaHiloProfesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => HiloProfesionales, respuesta => respuesta.id)
  @JoinColumn({ name: 'id_respuesta' })
  id_respuesta!: HiloProfesionales;

  @ManyToOne(() => Profesionales, profesional => profesional.id)
  @JoinColumn({ name: 'id_profesional' })
  id_profesional!: Profesionales;

  @Column()
  mensaje!: string;

  @Column()
  archivo_adjunto!: string;

  @Column()
  fecha_hora!: Date;
}

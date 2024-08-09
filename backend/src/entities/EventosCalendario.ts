import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Usuarios } from './Usuarios';

@Entity({ name: 'eventos_calendario' })
export class EventosCalendario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre_evento!: string;

  @Column()
  fecha_hora!: Date;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

}

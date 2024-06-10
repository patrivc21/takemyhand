import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from './Usuarios'; 
import { HiloUsuarios } from './HiloUsuarios'; 

@Entity({ name: 'respuesta_hilo_usuarios' })
export class RespuestaHiloProfesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => HiloUsuarios, respuesta => respuesta.id)
  @JoinColumn({ name: 'id_respuesta' })
  id_respuesta!: HiloUsuarios;

  @ManyToOne(() => Usuarios, usuarios => usuarios.id)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario!: Usuarios;

  @Column()
  mensaje!: string;

  @Column()
  archivo_adjunto!: string;

  @Column()
  fecha_hora!: Date;
}

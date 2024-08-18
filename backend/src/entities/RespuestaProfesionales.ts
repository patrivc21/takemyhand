import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profesionales } from './Profesional'; 
import { HiloProfesionales } from './HiloProfesionales'; 
import { Usuarios } from './Usuarios';
import { ArchivosHiloProf } from './ArchivosHiloProf';

@Entity({ name: 'respuesta_hilo_profesionales' })
export class RespuestaHiloProfesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_hilo!: number;

  @ManyToOne(() => HiloProfesionales, respuesta => respuesta.id)
  @JoinColumn({ name: 'id_hilo' })
  respuesta!: HiloProfesionales;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @Column()
  mensaje!: string;

  @Column()
  archivo_adjunto!: string;

  @Column()
  fecha_hora!: Date;

  @Column()
  titulo!: string;

  @OneToMany(() => ArchivosHiloProf, archivo => archivo.respuesta) 
    archivos!: ArchivosHiloProf[];
}

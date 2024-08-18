import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuarios } from './Usuarios'; 
import { HiloUsuarios } from './HiloUsuarios'; 
import { ArchivosHiloUsuario } from './ArchivosHiloUsuarios';

@Entity({ name: 'respuesta_hilo_usuarios' })
export class RespuestaHiloUsuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_hilo!: number;

  @ManyToOne(() => HiloUsuarios, respuesta => respuesta.id)
  @JoinColumn({ name: 'id_hilo' })
  respuesta!: HiloUsuarios;

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

  @OneToMany(() => ArchivosHiloUsuario, archivo => archivo.respuesta) // Alias 'archivos'
    archivos!: ArchivosHiloUsuario[];
}

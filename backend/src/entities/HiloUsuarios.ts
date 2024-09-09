import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuarios } from './Usuarios';
import { ArchivosHiloUsuario } from './ArchivosHiloUsuarios';

@Entity({ name: 'hilo_usuarios' })
export class HiloUsuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({type: 'text'})
  mensaje!: string;

  @Column()
  fecha_hora!: Date;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @OneToMany(() => ArchivosHiloUsuario, archivo => archivo.hilo) // Alias 'archivos'
    archivos!: ArchivosHiloUsuario[];
}

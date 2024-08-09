import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuarios } from './Usuarios';
import { ArchivosHiloUsuario } from './ArchivosHiloUsuarios';

@Entity({ name: 'login_register' })
export class LoginRegister {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  estado!: number;

  @Column()
  fecha!: Date;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

}

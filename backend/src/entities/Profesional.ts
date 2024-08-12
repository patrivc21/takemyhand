import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';
import { Usuarios } from './Usuarios';

@Entity({ name: 'profesionales' })
export class Profesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  activo!: boolean;

  @Column()
  id_usuario!: number;

  @ManyToOne(() => Usuarios, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuarios;

  @Column()
  ciudad!: string;

  @Column()
  direccion!: string;

  @Column('float', { precision: 10, scale: 6 })
  latitud!: number;

  @Column('float', { precision: 10, scale: 6 })
  longitud!: number;
}

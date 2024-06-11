import { Unique, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { RolUsuarios } from './RolUsuarios';

@Entity({name: 'usuarios'})
export class Usuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellidos!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  username!: string;

  @Column()
  rol!: number;

  @ManyToOne(() => RolUsuarios, rolusuarios => rolusuarios.id)
  @JoinColumn({ name: 'rol' })
  rolusuarios!: RolUsuarios;

}
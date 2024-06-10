import { Unique, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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
  rol!: number;

}
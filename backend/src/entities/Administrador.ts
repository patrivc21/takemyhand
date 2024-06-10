import { Unique, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({name: 'administradores'})
export class Administradores {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    nombre!: string;
  
    @Column()
    username!: string;
  
    @Column()
    email!: string;
  
    @Column()
    password!: string;

}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'rol_usuarios' })
export class RolUsuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;
}

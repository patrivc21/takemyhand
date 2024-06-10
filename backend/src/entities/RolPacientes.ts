import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'rol_paciente' })
export class RolPaciente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;
}

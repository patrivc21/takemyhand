import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  especialidad!: string;
}

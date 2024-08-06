import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'recursos' })
export class Recursos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  contenido!: string;

  @Column()
  titulo!: string;
}

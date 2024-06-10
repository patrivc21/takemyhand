import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'recursos' })
export class Recursos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  contenido!: string;

  @Column()
  titulo!: string;

  @Column()
  archivo_adjunti!: string;
}

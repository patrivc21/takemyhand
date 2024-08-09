import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ArchivosRecursos } from './ArchivosRecursos';

@Entity({ name: 'recursos' })
export class Recursos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  contenido!: string;

  @Column()
  titulo!: string;

  @Column()
  url_video!: string;

  @OneToMany(() => ArchivosRecursos, archivo => archivo.recurso)
  archivos!: ArchivosRecursos[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ArchivosRecursos } from './ArchivosRecursos';

@Entity({ name: 'recursos' })
export class Recursos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'text'})
  contenido!: string;

  @Column()
  titulo!: string;

  @Column({type: 'longtext'})
  url_video!: string;

  @OneToMany(() => ArchivosRecursos, archivo => archivo.recurso)
  archivos!: ArchivosRecursos[];
}

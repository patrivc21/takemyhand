import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Profesionales } from './Profesional';
import { ArchivosHiloProf } from './ArchivosHiloProf';

@Entity({ name: 'hilo_profesionales' })
export class HiloProfesionales {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({type: 'text'})
  mensaje!: string;
  
  @Column()
  fecha_hora!: Date;

  @Column()
  id_profesional!: number;

  @ManyToOne(() => Profesionales, profesional => profesional.id)
  @JoinColumn({ name: 'id_profesional' })
  profesional!: Profesionales;

  @OneToMany(() => ArchivosHiloProf, archivo => archivo.hilo) // Alias 'archivos'
    archivos!: ArchivosHiloProf[];
}

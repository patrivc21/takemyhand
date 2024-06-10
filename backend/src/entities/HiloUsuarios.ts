import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'hilo_usuarios' })
export class HiloUsuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  mensaje!: string;

  @Column()
  archivo_adjunto!: string;

  @Column()
  fecha_hora!: Date;
}

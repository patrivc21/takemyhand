import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesionales } from './Profesional';
import { Pacientes } from './Pacientes';

@Entity({ name: 'chat_privado' })
export class ChatPrivado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_emisor!: number;

  @Column()
  id_receptor!: number;

  @Column({type: 'longtext'})
  mensaje!: string;

  @Column()
  fecha_hora!: Date;

}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nomenklature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  cost: number;
}
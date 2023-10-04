import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Nomenklature } from './nomenklatura.entity';

@Entity()
export class Links {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nomenklature)
  @JoinColumn({ name: 'nomenklatureId' })
  nomenklatureId: Nomenklature;

  @ManyToOne(() => Nomenklature)
  @JoinColumn({ name: 'parentId' })
  parentId: Nomenklature;

  @Column({ type: 'int' })
  kol: number;
}
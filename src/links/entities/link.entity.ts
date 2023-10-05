import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Nomenklature } from '../../nomenklatura/entities/nomenklatura.entity';

@Entity()
export class Links {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nomenklature, (nomenklature) => nomenklature.links, { eager: true })
  nomenklature: Nomenklature;

  @ManyToOne(() => Nomenklature, (nomenklature) => nomenklature.parentLinks)
  parent: Nomenklature;

  @Column({ type: 'int' })
  kol: number;
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Links } from 'src/links/entities/link.entity';

@Entity()
export class Nomenklature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  cost: number;

  @OneToMany(() => Links, (links) => links.nomenklature)
  links: Links[];

  @OneToMany(() => Links, (links) => links.parent)
  parentLinks: Links[];
}
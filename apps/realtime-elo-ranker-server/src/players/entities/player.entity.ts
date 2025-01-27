import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('players')
export class PlayerEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('integer')
  rank: number;
}

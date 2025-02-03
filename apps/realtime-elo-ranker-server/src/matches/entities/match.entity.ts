import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('match')
export class MatchEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  winner: string;

  @Column('text')
  loser: string;

  @Column('boolean')
  draw: boolean;
}

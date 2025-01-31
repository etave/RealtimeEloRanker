import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('match')
export class MatchEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  winner: string | undefined;

  @Column('text')
  loser: string | undefined;

  @Column('boolean')
  draw: boolean;
}

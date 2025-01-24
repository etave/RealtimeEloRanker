import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
export class PlayerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    elo: number;
}
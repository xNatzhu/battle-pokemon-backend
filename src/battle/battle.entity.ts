import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Battle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pokemon)
    @JoinColumn({ name: 'pokemon1_id' })
    pokemon1: Pokemon;

    @ManyToOne(() => Pokemon)
    @JoinColumn({ name: 'pokemon2_id' })
    pokemon2: Pokemon;

    @ManyToOne(() => Pokemon)
    @JoinColumn({ name: 'winner_id' })
    winner: Pokemon;
}

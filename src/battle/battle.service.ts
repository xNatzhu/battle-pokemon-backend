import { Injectable } from '@nestjs/common';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemon/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Tipos de Pokémon 
export enum PokemonType {
    FIRE = 'Fire',
    WATER = 'Water',
    GRASS = 'Grass',
    ELECTRIC = 'Electric',
    NORMAL = 'Normal',
    FIGHTING = 'Fighting',
    GHOST = 'Ghost',
}

// Relaciones de ventaja de tipo
const TYPE_ADVANTAGE = {
    [PokemonType.FIRE]: [PokemonType.GRASS],
    [PokemonType.WATER]: [PokemonType.FIRE],
    [PokemonType.GRASS]: [PokemonType.WATER],
    [PokemonType.ELECTRIC]: [PokemonType.WATER],
    [PokemonType.FIGHTING]: [PokemonType.NORMAL],
    [PokemonType.GHOST]: [PokemonType.GHOST],
};

// Relación de inmunidades de tipo
const TYPE_IMMUNITY = {
    [PokemonType.NORMAL]: [PokemonType.GHOST],
    [PokemonType.GHOST]: [PokemonType.NORMAL],
};

@Injectable()
export class BattleService {
    constructor(
        @InjectRepository(Battle)
        private battleRepository: Repository<Battle>,
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>
    ) {}

    async fight(pokemon1: string, pokemon2: string) {
        const firstAttacker = await this.pokemonRepository.findOne({ where: { id: pokemon1 } });
        const secondAttacker = await this.pokemonRepository.findOne({ where: { id: pokemon2 } });
    
        if (!firstAttacker || !secondAttacker) {
            throw new Error('Uno o ambos Pokémon no fueron encontrados.');
        }
    
        const [attacker1, attacker2] = this.determineAttackOrder(firstAttacker, secondAttacker);
    
        this.simulateBattle(attacker1, attacker2);
    
        const winner = attacker1.hp > 0 ? attacker1 : attacker2;
        const battle = new Battle();
        battle.pokemon1 = attacker1;
        battle.pokemon2 = attacker2;
        battle.winner = winner;
    
        await this.battleRepository.save(battle);
    
        return battle;
    }
    
    private determineAttackOrder(pokemon1: Pokemon, pokemon2: Pokemon) {
        if (pokemon1.speed === pokemon2.speed) {
            return pokemon1.attack >= pokemon2.attack ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
        }
        return pokemon1.speed > pokemon2.speed ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
    }
    
    private simulateBattle(attacker1: Pokemon, attacker2: Pokemon) {
        const MIN_DAMAGE = 1; 
    
        while (attacker1.hp > 0 && attacker2.hp > 0) {
            this.applyDamage(attacker1, attacker2, MIN_DAMAGE);
            if (attacker2.hp > 0) {
                this.applyDamage(attacker2, attacker1, MIN_DAMAGE);
            }
        }
    }
    
    private applyDamage(attacker: Pokemon, defender: Pokemon, minDamage: number) {
        // Comprobar inmunidad de tipo
        if (TYPE_IMMUNITY[attacker.type] && TYPE_IMMUNITY[attacker.type].includes(defender.type)) {
            return; 
        }
        let damage = Math.max(minDamage, attacker.attack - defender.defense);
        // daño doble si hay ventaja de tipo
        if (TYPE_ADVANTAGE[attacker.type] && TYPE_ADVANTAGE[attacker.type].includes(defender.type)) {
            damage *= 2;
        // daño reducido a la mitad si hay desventaja de tipo
        } else if (TYPE_ADVANTAGE[defender.type] && TYPE_ADVANTAGE[defender.type].includes(attacker.type)) {
            damage /= 2;
        }

        defender.hp -= damage;
    }
}

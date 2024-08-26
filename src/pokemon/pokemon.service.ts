import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonReposity: Repository<Pokemon>
    ){}

    getPokemonId(id){
        return this.pokemonReposity.find(id)
    }

    getPokemonList() {
        return this.pokemonReposity.find()
    }

    async addPokemons(pokemons: Pokemon[]) {
        const pokemonEntities = this.pokemonReposity.create(pokemons);
        await this.pokemonReposity.save(pokemonEntities);
    }

    async addPokemonsFromJson() {
        const filePath = path.resolve(process.cwd(), './src/utils/mocks/pokemon.json');
        try {
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            const pokemonData = JSON.parse(fileContent).pokemon;
            // Verificar tipos de datos
            pokemonData.forEach(this.validatePokemonData);
            await this.addPokemons(pokemonData);
        } catch (error) {
            console.error('Error al agregar Pokemons desde JSON:', error);
        }
    }

    validatePokemonData(pokemon) {
        const requiredFields = ['attack', 'defense', 'hp', 'speed', 'type', 'imageUrl'];
        const requiredTypes = ['number', 'number', 'number', 'number', 'string', 'string'];
        requiredFields.forEach((field, index) => {
            if (typeof pokemon[field] !== requiredTypes[index]) {
                throw new Error(`Data type mismatch in JSON file for field ${field}`);
            }
        });
    }

}
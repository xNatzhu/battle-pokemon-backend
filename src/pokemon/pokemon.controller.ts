import { Controller, Get, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {
    }

    @Get()
    pokemonList() {
        return this.pokemonService.getPokemonList()
    }

    @Post()
    async addPokemonsFromJson() {
        return await this.pokemonService.addPokemonsFromJson();
    }
}


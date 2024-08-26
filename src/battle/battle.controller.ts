import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { Pokemon } from '../pokemon/pokemon.entity';

@Controller('battle')
export class BattleController {
    constructor(private battleService: BattleService) {}

    @Post()
    async battlePokemon(@Body() body: { pokemon1: string; pokemon2: string }) {
        const { pokemon1, pokemon2 } = body
        const winner = await this.battleService.fight(pokemon1, pokemon2)
        return winner
    }
}

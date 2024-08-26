import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Pokemon} from "./pokemon.entity"

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [TypeOrmModule.forFeature([Pokemon])]
})
export class PokemonModule {}

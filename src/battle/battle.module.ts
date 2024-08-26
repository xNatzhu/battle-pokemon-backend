import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Battle} from "./battle.entity";
import {Pokemon} from "../pokemon/pokemon.entity";

@Module({
  controllers: [BattleController],
  providers: [BattleService],
  imports: [TypeOrmModule.forFeature([Battle, Pokemon])]
})
export class BattleModule {}

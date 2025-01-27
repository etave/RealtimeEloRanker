import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerDatabaseService } from './services/player-database.service';
import { PlayersController } from '../players/controllers/players.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity])
  ],
  controllers: [PlayersController],
  providers: [PlayerDatabaseService],
  exports: [PlayerDatabaseService]
})
export class PlayersModule {}
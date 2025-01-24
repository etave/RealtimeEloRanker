import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerDatabaseService } from 'src/services/player-database.service';
import { RankingCacheService } from 'src/services/ranking-cache.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([PlayerEntity])
    ],
  providers: [
    {
      provide: RankingCacheService,
      useFactory: (eventEmitter: EventEmitter2) => RankingCacheService.getInstance(eventEmitter),
      inject: [EventEmitter2]
    },
    PlayerDatabaseService
  ],
})
export class PlayersModule {}
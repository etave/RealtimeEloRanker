import { Module } from '@nestjs/common';
import { RankingCacheService } from './services/ranking-cache.service';
import { RankingService } from './services/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [PlayersModule],
  providers: [
    {
      provide: RankingCacheService,
      useFactory: (eventEmitter: EventEmitter2) => RankingCacheService.getInstance(eventEmitter),
      inject: [EventEmitter2]
    },
    RankingService
  ],
  exports: [RankingService]
})
export class RankingModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { PlayersController } from './players/controllers/players.controller';
import {
  MatchesController,
  MatchHistoryController,
} from './matches/controllers/matches.controller';
import { RankingController } from './ranking/controllers/ranking.controller';
import { PlayerService } from './players/services/player.service';
import { PlayerDatabaseService } from './players/services/player-database.service';
import { MatchesService } from './matches/services/matches.service';
import { RankingService } from './ranking/services/ranking.service';
import { RankingCacheService } from './ranking/services/ranking-cache.service';
import { PlayerEntity } from './players/entities/player.entity';
import { MatchesDatabaseService } from './matches/services/matches-database.service';
import { MatchEntity } from './matches/entities/match.entity';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [PlayerEntity, MatchEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([PlayerEntity, MatchEntity]),
  ],
  controllers: [
    PlayersController,
    MatchesController,
    MatchHistoryController,
    RankingController,
  ],
  providers: [
    PlayerService,
    PlayerDatabaseService,
    MatchesService,
    MatchesDatabaseService,
    RankingService,
    {
      provide: RankingCacheService,
      useFactory: (eventEmitter: EventEmitter2) =>
        RankingCacheService.getInstance(eventEmitter),
      inject: [EventEmitter2],
    },
  ],
})
export class AppModule {}

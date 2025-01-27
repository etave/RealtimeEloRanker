import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { PlayersController } from './players/controllers/players.controller';
import { MatchesController } from './matches/controllers/matches.controller';
import { RankingController } from './ranking/controllers/ranking.controller';
import { PlayerService } from './players/services/player.service';
import { PlayerDatabaseService } from './players/services/player-database.service';
import { MatchesService } from './matches/services/matches.service';
import { RankingService } from './ranking/services/ranking.service';
import { RankingCacheService } from './ranking/services/ranking-cache.service';
import { PlayerEntity } from './players/entities/player.entity';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [PlayerEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([PlayerEntity]),
  ],
  controllers: [PlayersController, MatchesController, RankingController],
  providers: [
    PlayerService,
    PlayerDatabaseService,
    MatchesService,
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

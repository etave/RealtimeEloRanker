import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PlayersModule,
    RankingModule,
    MatchModule,
  ],
})
export class AppModule {}
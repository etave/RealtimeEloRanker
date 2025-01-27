import { Module } from '@nestjs/common';
import { MatchService } from './services/match.service';
import { RankingModule } from '../ranking/ranking.module';


@Module({
  imports: [RankingModule],
  // controllers: [MatchesController],
  providers: [MatchService],
})
export class MatchModule {}
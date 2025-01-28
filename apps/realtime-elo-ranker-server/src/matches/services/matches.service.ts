import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { RankingService } from '../../ranking/services/ranking.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';

@Injectable()
export class MatchesService {
  constructor(private rankingService: RankingService) {}

  public async processMatch(responseMatchDto: ResponseMatchDto) {

    if (responseMatchDto.draw) {
      return;
    }

    if (!responseMatchDto.winner || !responseMatchDto.loser) {
      throw new UnprocessableEntityException('Winner or loser not provided');
    }
    
    const winner = await this.rankingService.getPlayer(responseMatchDto.winner);
    const loser = await this.rankingService.getPlayer(responseMatchDto.loser);
    this.processRankingUpdate(winner, loser);
  }

  private processRankingUpdate(winner: ResponsePlayerDto, loser: ResponsePlayerDto) {
    const [newWinnerRank, newLoserRank] = this.calculateNewRanks(winner, loser, false);
    winner.rank = Math.floor(newWinnerRank);
    loser.rank = Math.floor(newLoserRank);
    this.rankingService.updatePlayerRanking(winner);
    this.rankingService.updatePlayerRanking(loser);
  }

  private calculateVictoryProbabilities(
    winner: ResponsePlayerDto,
    loser: ResponsePlayerDto,
  ): [number, number] {
    const WHe = 1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));
    const WLe = 1 - WHe;
    return [WHe, WLe];
  }

  private calculateNewRanks(
    winner: ResponsePlayerDto,
    loser: ResponsePlayerDto,
    draw: boolean,
  ): [number, number] {
    const K = 32;
    const [WHe, WLe] = this.calculateVictoryProbabilities(winner, loser);
    const WW = draw ? 0.5 : 1;
    const WL = draw ? 0.5 : 0;

    const newWinnerRank = winner.rank + K * (WW - WHe);
    const newLoserRank = loser.rank + K * (WL - WLe);

    return [newWinnerRank, newLoserRank];
  }
}
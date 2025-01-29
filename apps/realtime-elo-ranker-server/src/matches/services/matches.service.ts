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

  private processRankingUpdate(
    winner: ResponsePlayerDto,
    loser: ResponsePlayerDto,
  ) {
    const [newWinnerRank, newLoserRank] = this.calculateNewRanks(
      winner,
      loser,
      false,
    );
    winner.rank = Math.floor(newWinnerRank);
    loser.rank = Math.floor(newLoserRank);
    this.rankingService.updatePlayerRanking(winner);
    this.rankingService.updatePlayerRanking(loser);
  }

  private calculateVictoryProbabilities(
    playerRating: number,
    opponentRating: number,
  ): number {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  }

  private calculateNewRanks(
    winner: ResponsePlayerDto,
    loser: ResponsePlayerDto,
    draw: boolean,
  ): [number, number] {
    const K = 32;

    const expectedWinner = this.calculateVictoryProbabilities(
      winner.rank,
      loser.rank,
    );
    const expectedLoser = this.calculateVictoryProbabilities(
      loser.rank,
      winner.rank,
    );

    const actualWinner = draw ? 0.5 : 1.0;
    const actualLoser = draw ? 0.5 : 0.0;

    let newWinnerRank = Math.round(
      winner.rank + K * (actualWinner - expectedWinner),
    );
    let newLoserRank = Math.round(
      loser.rank + K * (actualLoser - expectedLoser),
    );

    newWinnerRank = Math.max(0, newWinnerRank);
    newLoserRank = Math.max(0, newLoserRank);

    return [newWinnerRank, newLoserRank];
  }
}

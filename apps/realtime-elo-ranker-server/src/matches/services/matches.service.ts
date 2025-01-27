import { Injectable } from '@nestjs/common';
import { RankingService } from '../../ranking/services/ranking.service';

@Injectable()
export class MatchesService {
  constructor(private rankingService: RankingService) {}

  public async processMatch(
    player1Id: string,
    player2Id: string,
    isDraw: boolean,
    winnerId?: string,
  ) {
    const matchResult = isDraw ? 0.5 : winnerId === player1Id ? 1 : 0;
    //await this.rankingService.updateRatings(player1Id, player2Id, matchResult);
  }
}

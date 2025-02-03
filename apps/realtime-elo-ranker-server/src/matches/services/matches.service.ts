import {
  Injectable,
  UnprocessableEntityException,
  OnModuleInit,
} from '@nestjs/common';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { RankingService } from '../../ranking/services/ranking.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { MatchesDatabaseService } from './matches-database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MatchesService implements OnModuleInit {
  private matchHistory: ResponseMatchDto[] = [];

  constructor(
    private eventEmitter: EventEmitter2,
    private rankingService: RankingService,
    private matchesDatabaseService: MatchesDatabaseService,
  ) {}

  public async processMatch(responseMatchDto: ResponseMatchDto) {
    if (!responseMatchDto.winner || !responseMatchDto.loser) {
      throw new UnprocessableEntityException('Winner or loser not provided');
    }

    const winner = await this.rankingService.getPlayer(responseMatchDto.winner);
    const loser = await this.rankingService.getPlayer(responseMatchDto.loser);
    this.processRankingUpdate(winner, loser, responseMatchDto.draw);
    if (responseMatchDto.draw !== true) {
      this.matchesDatabaseService.addMatch(responseMatchDto);
      this.matchHistory.push(responseMatchDto);
      this.refreshMatchHistory(responseMatchDto);
    }
  }

  private processRankingUpdate(
    winner: ResponsePlayerDto,
    loser: ResponsePlayerDto,
    draw: boolean,
  ) {
    const [newWinnerRank, newLoserRank] = this.calculateNewRanks(
      winner,
      loser,
      draw,
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

  public getMatchHistory(): ResponseMatchDto[] {
    return this.matchHistory.slice(-10);
  }

  private refreshMatchHistory(responseMatchDto: ResponseMatchDto) {
    this.eventEmitter.emit('matches.update', responseMatchDto);
  }

  async onModuleInit() {
    this.matchesDatabaseService.getMatchHistory().then((matches) => {
      this.matchHistory = matches;
    });
  }
}

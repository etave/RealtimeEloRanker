import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RankingCacheService } from './ranking-cache.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerService } from '../../players/services/player.service';

@Injectable()
export class RankingService implements OnModuleInit {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly rankingCacheService: RankingCacheService,
    private readonly playerService: PlayerService,
  ) {
    this.eventEmitter.on('cache.updated', (id: string) => {
      this.refreshPlayerRanking(id);
    });
  }

  public async getPlayer(id: string): Promise<ResponsePlayerDto> {
    const player = this.rankingCacheService.getPlayer(id);
    if (player === undefined) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  public getRanking(): ResponsePlayerDto[] {
    const ranking = this.rankingCacheService.getPlayers();
    if (ranking.length === 0) {
      throw new NotFoundException('Ranking is empty, no players found');
    }
    return ranking;
  }

  public updatePlayerRanking(responsePlayerDto: ResponsePlayerDto) {
    this.rankingCacheService.updatePlayer(responsePlayerDto);
    this.playerService.updatePlayer(responsePlayerDto);
  }

  private refreshPlayerRanking(id: string) {
    const player = this.rankingCacheService.getPlayer(id);

    if (player === undefined) {
      this.eventEmitter.emit('ranking.error');
    } else {
      this.eventEmitter.emit(
        'ranking.update',
        this.rankingCacheService.getPlayer(id),
      );
    }
  }

  async onModuleInit() {
    const players = await this.playerService.getAllPlayers();
    players.sort((a, b) => b.rank - a.rank);
    this.rankingCacheService.initializeCache(players);
  }
}

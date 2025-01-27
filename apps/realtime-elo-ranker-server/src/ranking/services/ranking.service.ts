import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PlayerDatabaseService } from '../../players/services/player-database.service';
import { RankingCacheService } from './ranking-cache.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RankingService implements OnModuleInit {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly rankingCacheService: RankingCacheService,
    private readonly playerDatabaseService: PlayerDatabaseService,
  ) {
    this.eventEmitter.on('cache.updated', (id: string) => {
      this.updateRanking(id);
    });
  }

  public getRanking(): ResponsePlayerDto[] {
    const ranking = this.rankingCacheService.getPlayers();
    if (ranking.length === 0) {
      throw new NotFoundException('Ranking is empty, no players found');
    }
    return ranking;
  }

  private updateRanking(id: string) {
    this.eventEmitter.emit(
      'ranking.update',
      this.rankingCacheService.getPlayer(id),
    );
  }

  async onModuleInit() {
    const players = await this.playerDatabaseService.getAllPlayers();
    this.rankingCacheService.initializeCache(players);
  }
}

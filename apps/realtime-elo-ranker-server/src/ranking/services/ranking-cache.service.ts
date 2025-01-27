import { Injectable } from '@nestjs/common';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RankingCacheService {
  private static singleton: RankingCacheService;
  private readonly players: Map<string, ResponsePlayerDto>;

  private constructor(private readonly eventEmitter: EventEmitter2) {
    this.players = new Map<string, ResponsePlayerDto>();
  }

  public static getInstance(eventEmitter: EventEmitter2): RankingCacheService {
    if (!RankingCacheService.singleton) {
      RankingCacheService.singleton = new RankingCacheService(eventEmitter);
    }
    return RankingCacheService.singleton;
  }

  public getPlayer(id: string): ResponsePlayerDto {
    const player = this.players.get(id);
    if (!player) {
      throw new Error(`Player ${id} not found`);
    }
    return player;
  }

  public updatePlayer(player: ResponsePlayerDto) {
    this.players.set(player.id, player);
  }

  public removePlayer(id: string) {
    this.players.delete(id);
  }

  public addPlayer(player: ResponsePlayerDto) {
    this.players.set(player.id, player);
    this.eventEmitter.emit('cache.updated', player.id);
  }

  public initializeCache(players: ResponsePlayerDto[]) {
    players.forEach((player) => {
      this.players.set(player.id, player);
    });
  }

  public clearCache() {
    this.players.clear();
  }

  public getPlayers(): ResponsePlayerDto[] {
    return Array.from(this.players.values());
  }

  public getAverageElo(): number {
    const totalElo = Array.from(this.players.values()).reduce(
      (previousValue: number, currentValue: ResponsePlayerDto) =>
        previousValue + currentValue.rank,
      0,
    );
    if (totalElo === 0) {
      return 1200;
    }
    return totalElo / this.players.size;
  }
}

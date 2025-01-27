import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PlayerDatabaseService } from './player-database.service';
import { RankingCacheService } from '../../ranking/services/ranking-cache.service';
import { ResponsePlayerDto } from '../dto/response-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    private readonly rankingCacheService: RankingCacheService,
    private readonly playerDatabaseService: PlayerDatabaseService,
  ) {}

  public async addPlayer(id: string): Promise<ResponsePlayerDto> {
    const player: ResponsePlayerDto = {
      id: id,
      rank: this.rankingCacheService.getAverageElo(),
    };

    if (!id || id.trim() === '') {
      throw new BadRequestException('Player name is not valid');
    }

    const existingPlayer = await this.playerDatabaseService.getPlayer(id);
    if (existingPlayer) {
      throw new ConflictException(`Player ${id} already exists`);
    }

    await this.playerDatabaseService.addPlayer(player);
    this.rankingCacheService.addPlayer(player);

    return player;
  }

  public async getAllPlayers(): Promise<ResponsePlayerDto[]> {
    return await this.playerDatabaseService.getAllPlayers();
  }

  public async getPlayer(id: string): Promise<ResponsePlayerDto | null> {
    return await this.playerDatabaseService.getPlayer(id);
  }

  public async deletePlayer(id: string): Promise<void> {
    await this.playerDatabaseService.removePlayer(id);
    this.rankingCacheService.removePlayer(id);
  }

  public async updatePlayer(player: ResponsePlayerDto): Promise<void> {
    await this.playerDatabaseService.updatePlayer(player);
    this.rankingCacheService.updatePlayer(player);
  }
}

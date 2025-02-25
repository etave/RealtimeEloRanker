import { PlayerDatabaseService } from './player-database.service';
import { RankingCacheService } from '../../ranking/services/ranking-cache.service';
import { ResponsePlayerDto } from '../dto/response-player.dto';
export declare class PlayerService {
    private readonly rankingCacheService;
    private readonly playerDatabaseService;
    constructor(rankingCacheService: RankingCacheService, playerDatabaseService: PlayerDatabaseService);
    addPlayer(id: string): Promise<ResponsePlayerDto>;
    getAllPlayers(): Promise<ResponsePlayerDto[]>;
    updatePlayer(player: ResponsePlayerDto): Promise<void>;
}

import { PlayerDatabaseService } from "../../players/services/player-database.service";
import { RankingCacheService } from "./ranking-cache.service";
import { ResponsePlayerDto } from "src/players/dto/response-player.dto";
export declare class RankingService {
    private readonly rankingCacheService;
    private readonly playerDatabaseService;
    constructor(rankingCacheService: RankingCacheService, playerDatabaseService: PlayerDatabaseService);
    getRanking(): ResponsePlayerDto[];
}

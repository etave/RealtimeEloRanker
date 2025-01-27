import { Injectable } from "@nestjs/common";
import { PlayerDatabaseService } from "../../players/services/player-database.service";
import { RankingCacheService } from "./ranking-cache.service";
import { ResponsePlayerDto } from "src/players/dto/response-player.dto";

@Injectable()
export class RankingService {
    constructor(
        private readonly rankingCacheService: RankingCacheService,
        private readonly playerDatabaseService: PlayerDatabaseService
    ) {}
    
    public getRanking(): ResponsePlayerDto[] {
        return this.rankingCacheService.getRanking();
    }
}
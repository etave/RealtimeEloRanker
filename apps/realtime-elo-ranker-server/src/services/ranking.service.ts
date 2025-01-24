import { Injectable } from "@nestjs/common";
import { PlayerDatabaseService } from "./player-database.service";
import { RankingCacheService } from "./ranking-cache.service";
import { ResponsePlayerDto } from "src/players/dto/response-player.dto";

@Injectable()
export class RankingService {
    constructor(
        private rankingCacheService: RankingCacheService,
        private playerDatabaseService: PlayerDatabaseService
    ) {}

    public async addPlayer(player: ResponsePlayerDto) {
    }
}
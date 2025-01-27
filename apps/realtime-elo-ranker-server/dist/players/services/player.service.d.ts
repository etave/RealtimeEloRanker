import { PlayerDatabaseService } from "./player-database.service";
import { RankingCacheService } from "../../ranking/services/ranking-cache.service";
import { ResponsePlayerDto } from "../dto/response-player.dto";
export declare class PlayerService {
    private rankingCacheService;
    private playerDatabaseService;
    constructor(rankingCacheService: RankingCacheService, playerDatabaseService: PlayerDatabaseService);
    addPlayer(name: string): Promise<ResponsePlayerDto>;
    getAllPlayers(): Promise<ResponsePlayerDto[]>;
    getPlayer(id: string): Promise<ResponsePlayerDto>;
    deletePlayer(id: string): Promise<void>;
    updatePlayer(player: ResponsePlayerDto): Promise<void>;
}

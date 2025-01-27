import { Injectable } from "@nestjs/common";
import { PlayerDatabaseService } from "./player-database.service";
import { RankingCacheService } from "../../ranking/services/ranking-cache.service";
import { ResponsePlayerDto } from "../dto/response-player.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class PlayerService {
    constructor(
        private rankingCacheService: RankingCacheService,
        private playerDatabaseService: PlayerDatabaseService
    ) {}

    public async addPlayer(name: string): Promise<ResponsePlayerDto> {
        const player: ResponsePlayerDto = {
            id: uuid(),
            name: name,
            elo: this.rankingCacheService.getAverageElo()
        };

        await this.playerDatabaseService.addPlayer(player);
        this.rankingCacheService.addPlayer(player);
        
        return player;
    }

    public async getAllPlayers(): Promise<ResponsePlayerDto[]> {
        return await this.playerDatabaseService.getAllPlayers();
    }

    public async getPlayer(id: string): Promise<ResponsePlayerDto> {
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
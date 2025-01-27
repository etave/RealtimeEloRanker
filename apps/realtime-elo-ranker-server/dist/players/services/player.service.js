"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_database_service_1 = require("./player-database.service");
const ranking_cache_service_1 = require("../../ranking/services/ranking-cache.service");
let PlayerService = class PlayerService {
    constructor(rankingCacheService, playerDatabaseService) {
        this.rankingCacheService = rankingCacheService;
        this.playerDatabaseService = playerDatabaseService;
    }
    async addPlayer(id) {
        const player = {
            id: id,
            rank: this.rankingCacheService.getAverageElo(),
        };
        if (!id || id.trim() === '') {
            throw new common_1.BadRequestException('Player name is not valid');
        }
        const existingPlayer = await this.playerDatabaseService.getPlayer(id);
        if (existingPlayer) {
            throw new common_1.ConflictException(`Player ${id} already exists`);
        }
        await this.playerDatabaseService.addPlayer(player);
        this.rankingCacheService.addPlayer(player);
        return player;
    }
    async getAllPlayers() {
        return await this.playerDatabaseService.getAllPlayers();
    }
    async getPlayer(id) {
        return await this.playerDatabaseService.getPlayer(id);
    }
    async deletePlayer(id) {
        await this.playerDatabaseService.removePlayer(id);
        this.rankingCacheService.removePlayer(id);
    }
    async updatePlayer(player) {
        await this.playerDatabaseService.updatePlayer(player);
        this.rankingCacheService.updatePlayer(player);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService,
        player_database_service_1.PlayerDatabaseService])
], PlayerService);
//# sourceMappingURL=player.service.js.map
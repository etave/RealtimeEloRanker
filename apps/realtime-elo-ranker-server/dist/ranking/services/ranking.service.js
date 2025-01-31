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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const ranking_cache_service_1 = require("./ranking-cache.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const player_service_1 = require("../../players/services/player.service");
let RankingService = class RankingService {
    constructor(eventEmitter, rankingCacheService, playerService) {
        this.eventEmitter = eventEmitter;
        this.rankingCacheService = rankingCacheService;
        this.playerService = playerService;
        this.eventEmitter.on('cache.updated', (id) => {
            this.refreshPlayerRanking(id);
        });
    }
    async getPlayer(id) {
        const player = this.rankingCacheService.getPlayer(id);
        if (player === undefined) {
            throw new common_1.NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }
    getRanking() {
        const ranking = this.rankingCacheService.getPlayers();
        if (ranking.length === 0) {
            throw new common_1.NotFoundException('Ranking is empty, no players found');
        }
        return ranking;
    }
    updatePlayerRanking(responsePlayerDto) {
        this.rankingCacheService.updatePlayer(responsePlayerDto);
        this.playerService.updatePlayer(responsePlayerDto);
    }
    refreshPlayerRanking(id) {
        const player = this.rankingCacheService.getPlayer(id);
        if (player === undefined) {
            this.eventEmitter.emit('ranking.error');
        }
        else {
            this.eventEmitter.emit('ranking.update', this.rankingCacheService.getPlayer(id));
        }
    }
    async onModuleInit() {
        const players = await this.playerService.getAllPlayers();
        players.sort((a, b) => b.rank - a.rank);
        this.rankingCacheService.initializeCache(players);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        ranking_cache_service_1.RankingCacheService,
        player_service_1.PlayerService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map
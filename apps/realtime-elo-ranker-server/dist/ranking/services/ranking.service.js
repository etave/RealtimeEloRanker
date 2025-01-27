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
const player_database_service_1 = require("../../players/services/player-database.service");
const ranking_cache_service_1 = require("./ranking-cache.service");
let RankingService = class RankingService {
    constructor(rankingCacheService, playerDatabaseService) {
        this.rankingCacheService = rankingCacheService;
        this.playerDatabaseService = playerDatabaseService;
    }
    getRanking() {
        return this.rankingCacheService.getRanking();
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService,
        player_database_service_1.PlayerDatabaseService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map
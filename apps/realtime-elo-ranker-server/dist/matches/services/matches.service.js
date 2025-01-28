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
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("../../ranking/services/ranking.service");
let MatchesService = class MatchesService {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async processMatch(responseMatchDto) {
        if (responseMatchDto.draw) {
            return;
        }
        if (!responseMatchDto.winner || !responseMatchDto.loser) {
            throw new common_1.UnprocessableEntityException('Winner or loser not provided');
        }
        const winner = await this.rankingService.getPlayer(responseMatchDto.winner);
        const loser = await this.rankingService.getPlayer(responseMatchDto.loser);
        this.processRankingUpdate(winner, loser);
    }
    processRankingUpdate(winner, loser) {
        const [newWinnerRank, newLoserRank] = this.calculateNewRanks(winner, loser, false);
        winner.rank = Math.floor(newWinnerRank);
        loser.rank = Math.floor(newLoserRank);
        this.rankingService.updatePlayerRanking(winner);
        this.rankingService.updatePlayerRanking(loser);
    }
    calculateVictoryProbabilities(winner, loser) {
        const WHe = 1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));
        const WLe = 1 - WHe;
        return [WHe, WLe];
    }
    calculateNewRanks(winner, loser, draw) {
        const K = 32;
        const [WHe, WLe] = this.calculateVictoryProbabilities(winner, loser);
        const WW = draw ? 0.5 : 1;
        const WL = draw ? 0.5 : 0;
        const newWinnerRank = winner.rank + K * (WW - WHe);
        const newLoserRank = loser.rank + K * (WL - WLe);
        return [newWinnerRank, newLoserRank];
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map
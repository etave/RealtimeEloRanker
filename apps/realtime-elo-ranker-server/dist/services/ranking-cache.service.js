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
var RankingCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingCacheService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let RankingCacheService = RankingCacheService_1 = class RankingCacheService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.ranking = new Map();
    }
    static getInstance(eventEmitter) {
        if (!RankingCacheService_1.singleton) {
            RankingCacheService_1.singleton = new RankingCacheService_1(eventEmitter);
        }
        return RankingCacheService_1.singleton;
    }
    getPlayer(id) {
        const player = this.ranking.get(id);
        if (!player) {
            throw new Error(`Player ${id} not found`);
        }
        return player;
    }
    updatePlayer(player) {
        this.ranking.set(player.id, player);
        this.sortRanking();
    }
    removePlayer(id) {
        this.ranking.delete(id);
        this.sortRanking();
    }
    addPlayer(player) {
        this.ranking.set(player.id, player);
        this.sortRanking();
    }
    getRanking() {
        return this.sortedRanking;
    }
    sortRanking() {
        this.sortedRanking = Array.from(this.ranking.values())
            .sort((a, b) => b.elo - a.elo);
    }
    initializeCache(players) {
        players.forEach(player => {
            this.ranking.set(player.id, player);
        });
        this.sortRanking();
    }
};
exports.RankingCacheService = RankingCacheService;
exports.RankingCacheService = RankingCacheService = RankingCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], RankingCacheService);
//# sourceMappingURL=ranking-cache.service.js.map
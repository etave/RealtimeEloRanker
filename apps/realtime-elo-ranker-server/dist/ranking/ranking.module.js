"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingModule = void 0;
const common_1 = require("@nestjs/common");
const ranking_cache_service_1 = require("./services/ranking-cache.service");
const ranking_service_1 = require("./services/ranking.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const players_module_1 = require("../players/players.module");
let RankingModule = class RankingModule {
};
exports.RankingModule = RankingModule;
exports.RankingModule = RankingModule = __decorate([
    (0, common_1.Module)({
        imports: [players_module_1.PlayersModule],
        providers: [
            {
                provide: ranking_cache_service_1.RankingCacheService,
                useFactory: (eventEmitter) => ranking_cache_service_1.RankingCacheService.getInstance(eventEmitter),
                inject: [event_emitter_1.EventEmitter2]
            },
            ranking_service_1.RankingService
        ],
        exports: [ranking_service_1.RankingService]
    })
], RankingModule);
//# sourceMappingURL=ranking.module.js.map
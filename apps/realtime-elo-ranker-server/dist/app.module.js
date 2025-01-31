"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const players_controller_1 = require("./players/controllers/players.controller");
const matches_controller_1 = require("./matches/controllers/matches.controller");
const ranking_controller_1 = require("./ranking/controllers/ranking.controller");
const player_service_1 = require("./players/services/player.service");
const player_database_service_1 = require("./players/services/player-database.service");
const matches_service_1 = require("./matches/services/matches.service");
const ranking_service_1 = require("./ranking/services/ranking.service");
const ranking_cache_service_1 = require("./ranking/services/ranking-cache.service");
const player_entity_1 = require("./players/entities/player.entity");
const matches_database_service_1 = require("./matches/services/matches-database.service");
const match_entity_1 = require("./matches/entities/match.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [player_entity_1.PlayerEntity, match_entity_1.MatchEntity],
                synchronize: true,
                autoLoadEntities: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([player_entity_1.PlayerEntity, match_entity_1.MatchEntity]),
        ],
        controllers: [
            players_controller_1.PlayersController,
            matches_controller_1.MatchesController,
            matches_controller_1.MatchHistoryController,
            ranking_controller_1.RankingController,
        ],
        providers: [
            player_service_1.PlayerService,
            player_database_service_1.PlayerDatabaseService,
            matches_service_1.MatchesService,
            matches_database_service_1.MatchesDatabaseService,
            ranking_service_1.RankingService,
            {
                provide: ranking_cache_service_1.RankingCacheService,
                useFactory: (eventEmitter) => ranking_cache_service_1.RankingCacheService.getInstance(eventEmitter),
                inject: [event_emitter_1.EventEmitter2],
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
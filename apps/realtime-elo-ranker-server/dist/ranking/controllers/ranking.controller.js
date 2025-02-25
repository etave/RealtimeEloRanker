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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("../services/ranking.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_interface_1 = require("../interfaces/ranking.interface");
let RankingController = class RankingController {
    constructor(rankingService, eventEmitter) {
        this.rankingService = rankingService;
        this.eventEmitter = eventEmitter;
    }
    getRanking() {
        return this.rankingService.getRanking();
    }
    getEvents(response) {
        const listener = (player) => {
            const event = {
                type: ranking_interface_1.RankingEventType.RankingUpdate,
                player: player,
            };
            response.write(`data: ${JSON.stringify(event)}\n\n`);
        };
        const errorListener = () => {
            const event = {
                type: ranking_interface_1.RankingEventType.Error,
            };
            response.write(`data: ${JSON.stringify(event)}\n\n`);
        };
        this.eventEmitter.on('ranking.update', listener);
        this.eventEmitter.on('ranking.error', errorListener);
        response.on('close', () => {
            this.eventEmitter.off('ranking.update', listener);
            this.eventEmitter.off('ranking.error', errorListener);
            response.end();
        });
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('events'),
    (0, common_1.Header)('Content-Type', 'text/event-stream'),
    (0, common_1.Header)('Cache-Control', 'no-cache'),
    (0, common_1.Header)('Connection', 'keep-alive'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "getEvents", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        event_emitter_1.EventEmitter2])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map
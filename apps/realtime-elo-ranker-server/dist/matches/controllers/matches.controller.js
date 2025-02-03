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
exports.MatchHistoryController = exports.MatchesController = void 0;
const common_1 = require("@nestjs/common");
const matches_service_1 = require("../services/matches.service");
const response_match_dto_1 = require("../dto/response-match.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
let MatchesController = class MatchesController {
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    async processMatch(responseMatchDto) {
        await this.matchesService.processMatch(responseMatchDto);
    }
};
exports.MatchesController = MatchesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [response_match_dto_1.ResponseMatchDto]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "processMatch", null);
exports.MatchesController = MatchesController = __decorate([
    (0, common_1.Controller)('match'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
let MatchHistoryController = class MatchHistoryController {
    constructor(matchesService, eventEmitter) {
        this.matchesService = matchesService;
        this.eventEmitter = eventEmitter;
    }
    getMatchHistory() {
        return this.matchesService.getMatchHistory();
    }
    getEvents(response) {
        const listener = (match) => {
            response.write(`data: ${JSON.stringify(match)}\n\n`);
        };
        this.eventEmitter.on('matches.update', listener);
        response.on('close', () => {
            this.eventEmitter.off('matches.update', listener);
            response.end();
        });
    }
};
exports.MatchHistoryController = MatchHistoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MatchHistoryController.prototype, "getMatchHistory", null);
__decorate([
    (0, common_1.Get)('events'),
    (0, common_1.Header)('Content-Type', 'text/event-stream'),
    (0, common_1.Header)('Cache-Control', 'no-cache'),
    (0, common_1.Header)('Connection', 'keep-alive'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MatchHistoryController.prototype, "getEvents", null);
exports.MatchHistoryController = MatchHistoryController = __decorate([
    (0, common_1.Controller)('match/history'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService,
        event_emitter_1.EventEmitter2])
], MatchHistoryController);
//# sourceMappingURL=matches.controller.js.map
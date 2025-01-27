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
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const create_player_dto_1 = require("../dto/create-player.dto");
const player_service_1 = require("../services/player.service");
let PlayersController = class PlayersController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async create(createPlayerDto) {
        return await this.playerService.addPlayer(createPlayerDto.name);
    }
    async getAllPlayers() {
        return await this.playerService.getAllPlayers();
    }
    async getPlayer(id) {
        return await this.playerService.getPlayer(id);
    }
    async deletePlayer(id) {
        await this.playerService.deletePlayer(id);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllPlayers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map
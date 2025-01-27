import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatePlayerDto } from "../dto/create-player.dto";
import { ResponsePlayerDto } from "../dto/response-player.dto";
import { PlayerService } from "../services/player.service";


@Controller('players')
export class PlayersController {
    constructor(
        private readonly playerService: PlayerService
    ) {}

    @Post()
    async create(@Body() createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto> {
        return await this.playerService.addPlayer(createPlayerDto.name);
    }

    @Get()
    async getAllPlayers(): Promise<ResponsePlayerDto[]> {
        return await this.playerService.getAllPlayers();
    }

    @Get(':id')
    async getPlayer(@Param('id') id: string): Promise<ResponsePlayerDto> {
        return await this.playerService.getPlayer(id);
    }

    @Delete(':id')
    async deletePlayer(@Param('id') id: string): Promise<void> {
        await this.playerService.deletePlayer(id);
    }
}
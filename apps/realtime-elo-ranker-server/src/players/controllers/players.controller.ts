import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { ResponsePlayerDto } from '../dto/response-player.dto';
import { PlayerService } from '../services/player.service';

@Controller('player')
export class PlayersController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<ResponsePlayerDto> {
    return await this.playerService.addPlayer(createPlayerDto.id);
  }
}

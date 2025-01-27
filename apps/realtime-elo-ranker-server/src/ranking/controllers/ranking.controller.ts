import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { RankingService } from '../services/ranking.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  RankingEvent,
  RankingEventType,
} from '../interfaces/ranking.interface';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getRanking(): ResponsePlayerDto[] {
    return this.rankingService.getRanking();
  }

  @Get('events')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  getEvents(@Res() response: Response) {
    const listener = (player: ResponsePlayerDto) => {
      const event: RankingEvent = {
        type: RankingEventType.RankingUpdate,
        player: player,
      };
      response.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    this.eventEmitter.on('ranking.update', listener);

    response.on('close', () => {
      this.eventEmitter.off('ranking.update', listener);
      response.end();
    });
  }
}

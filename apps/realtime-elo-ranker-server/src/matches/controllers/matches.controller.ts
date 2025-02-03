import {
  Body,
  Post,
  Get,
  Controller,
  Res,
  Header,
  UseFilters,
} from '@nestjs/common';
import { MatchesService } from '../services/matches.service';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpExceptionFilter } from '../../common/filters/http-exeception.filter';

@Controller('match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async processMatch(
    @Body() responseMatchDto: ResponseMatchDto,
  ): Promise<void> {
    await this.matchesService.processMatch(responseMatchDto);
  }
}

@Controller('match/history')
export class MatchHistoryController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getMatchHistory(): ResponseMatchDto[] {
    return this.matchesService.getMatchHistory();
  }

  @Get('events')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  getEvents(@Res() response: Response) {
    const listener = (match: ResponseMatchDto) => {
      response.write(`data: ${JSON.stringify(match)}\n\n`);
    };

    this.eventEmitter.on('matches.update', listener);

    response.on('close', () => {
      this.eventEmitter.off('matches.update', listener);
      response.end();
    });
  }
}

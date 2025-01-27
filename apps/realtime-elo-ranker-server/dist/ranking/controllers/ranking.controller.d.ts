import { Response } from 'express';
import { RankingService } from '../services/ranking.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    getRanking(): ResponsePlayerDto[];
    getEvents(response: Response): void;
}

import { MatchesService } from '../services/matches.service';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    processMatch(responseMatchDto: ResponseMatchDto): Promise<void>;
}
export declare class MatchHistoryController {
    private readonly matchesService;
    private readonly eventEmitter;
    constructor(matchesService: MatchesService, eventEmitter: EventEmitter2);
    getMatchHistory(): ResponseMatchDto[];
    getEvents(response: Response): void;
}

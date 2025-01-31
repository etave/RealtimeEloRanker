import { OnModuleInit } from '@nestjs/common';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { RankingService } from '../../ranking/services/ranking.service';
import { MatchesDatabaseService } from './matches-database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchesService implements OnModuleInit {
    private eventEmitter;
    private rankingService;
    private matchesDatabaseService;
    private matchHistory;
    constructor(eventEmitter: EventEmitter2, rankingService: RankingService, matchesDatabaseService: MatchesDatabaseService);
    processMatch(responseMatchDto: ResponseMatchDto): Promise<void>;
    private processRankingUpdate;
    private calculateVictoryProbabilities;
    private calculateNewRanks;
    getMatchHistory(): ResponseMatchDto[];
    private refreshMatchHistory;
    onModuleInit(): Promise<void>;
}

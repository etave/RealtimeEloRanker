import { OnModuleInit } from '@nestjs/common';
import { PlayerDatabaseService } from '../../players/services/player-database.service';
import { RankingCacheService } from './ranking-cache.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingService implements OnModuleInit {
    private readonly eventEmitter;
    private readonly rankingCacheService;
    private readonly playerDatabaseService;
    constructor(eventEmitter: EventEmitter2, rankingCacheService: RankingCacheService, playerDatabaseService: PlayerDatabaseService);
    getRanking(): ResponsePlayerDto[];
    private updateRanking;
    onModuleInit(): Promise<void>;
}

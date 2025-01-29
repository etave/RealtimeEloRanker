import { OnModuleInit } from '@nestjs/common';
import { RankingCacheService } from './ranking-cache.service';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerService } from '../../players/services/player.service';
export declare class RankingService implements OnModuleInit {
    private readonly eventEmitter;
    private readonly rankingCacheService;
    private readonly playerService;
    constructor(eventEmitter: EventEmitter2, rankingCacheService: RankingCacheService, playerService: PlayerService);
    getPlayer(id: string): Promise<ResponsePlayerDto>;
    getRanking(): ResponsePlayerDto[];
    updatePlayerRanking(responsePlayerDto: ResponsePlayerDto): void;
    private refreshPlayerRanking;
    onModuleInit(): Promise<void>;
}

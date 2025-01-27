import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingCacheService {
    private readonly eventEmitter;
    private static singleton;
    private readonly players;
    private constructor();
    static getInstance(eventEmitter: EventEmitter2): RankingCacheService;
    getPlayer(id: string): ResponsePlayerDto;
    updatePlayer(player: ResponsePlayerDto): void;
    removePlayer(id: string): void;
    addPlayer(player: ResponsePlayerDto): void;
    initializeCache(players: ResponsePlayerDto[]): void;
    clearCache(): void;
    getPlayers(): ResponsePlayerDto[];
    getAverageElo(): number;
}

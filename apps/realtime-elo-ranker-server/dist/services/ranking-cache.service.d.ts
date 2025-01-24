import { EventEmitter2 } from "@nestjs/event-emitter";
import { ResponsePlayerDto } from "src/players/dto/response-player.dto";
export declare class RankingCacheService {
    private eventEmitter;
    private static singleton;
    private ranking;
    private sortedRanking;
    private constructor();
    static getInstance(eventEmitter: EventEmitter2): RankingCacheService;
    getPlayer(id: string): ResponsePlayerDto;
    updatePlayer(player: ResponsePlayerDto): void;
    removePlayer(id: string): void;
    addPlayer(player: ResponsePlayerDto): void;
    getRanking(): ResponsePlayerDto[];
    private sortRanking;
    initializeCache(players: ResponsePlayerDto[]): void;
}

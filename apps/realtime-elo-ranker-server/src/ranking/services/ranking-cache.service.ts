import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ResponsePlayerDto } from "src/players/dto/response-player.dto";

@Injectable()
export class RankingCacheService {
    private static singleton: RankingCacheService;
    private ranking: Map<string, ResponsePlayerDto>;
    private sortedRanking: ResponsePlayerDto[];
    //private history: Map<>;

    private constructor(private eventEmitter: EventEmitter2) {
        this.ranking = new Map<string, ResponsePlayerDto>();
        this.sortedRanking = [];
    }

    public static getInstance(eventEmitter: EventEmitter2): RankingCacheService {
        if (!RankingCacheService.singleton) {
            RankingCacheService.singleton = new RankingCacheService(eventEmitter);
        }
        return RankingCacheService.singleton;
    }

    public getPlayer(id: string): ResponsePlayerDto {
        const player = this.ranking.get(id);
        if (!player) {
            throw new Error(`Player ${id} not found`);
        }
        return player;
    }

    public updatePlayer(player: ResponsePlayerDto) {
        this.ranking.set(player.id, player);
        this.sortRanking();
    }

    public removePlayer(id: string) {
        this.ranking.delete(id);
        this.sortRanking();
    }

    public addPlayer(player: ResponsePlayerDto) {
        this.ranking.set(player.id, player);
        this.sortRanking();
    }

    public getRanking(): ResponsePlayerDto[] {
        return this.sortedRanking;
    }

    private sortRanking() {
        this.sortedRanking = Array.from(this.ranking.values())
            .sort((a, b) => b.elo - a.elo);
        this.eventEmitter.emit('ranking.updated', this.sortedRanking);
    }

    public initializeCache(players: ResponsePlayerDto[]) {
        players.forEach(player => {
            this.ranking.set(player.id, player);
        });
        this.sortRanking();
    }

    public clearCache() {
        this.ranking.clear();
        this.sortedRanking = [];
    }

    public getAverageElo(): number {
        let totalElo = this.sortedRanking.reduce((previousValue, currentValue) => previousValue + currentValue.elo, 0);
        if (totalElo === 0) {
            return 1200;
        }
        return totalElo / this.sortedRanking.length;
    }
}
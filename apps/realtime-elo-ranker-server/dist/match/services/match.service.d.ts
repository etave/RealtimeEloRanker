import { RankingService } from "../../ranking/services/ranking.service";
export declare class MatchService {
    private rankingService;
    constructor(rankingService: RankingService);
    processMatch(player1Id: string, player2Id: string, isDraw: boolean, winnerId?: string): Promise<void>;
}

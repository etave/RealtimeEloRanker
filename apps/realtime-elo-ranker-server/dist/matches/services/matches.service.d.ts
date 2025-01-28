import { ResponseMatchDto } from '../dto/response-match.dto';
import { RankingService } from '../../ranking/services/ranking.service';
export declare class MatchesService {
    private rankingService;
    constructor(rankingService: RankingService);
    processMatch(responseMatchDto: ResponseMatchDto): Promise<void>;
    private processRankingUpdate;
    private calculateVictoryProbabilities;
    private calculateNewRanks;
}

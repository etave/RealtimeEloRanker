import { Repository } from 'typeorm';
import { MatchEntity } from '../entities/match.entity';
import { ResponseMatchDto } from '../dto/response-match.dto';
export declare class MatchesDatabaseService {
    private readonly matchRepository;
    constructor(matchRepository: Repository<MatchEntity>);
    addMatch(match: ResponseMatchDto): Promise<void>;
    getMatchHistory(): Promise<ResponseMatchDto[]>;
}

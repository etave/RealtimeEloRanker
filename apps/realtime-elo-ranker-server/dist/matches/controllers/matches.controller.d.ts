import { MatchesService } from '../services/matches.service';
import { ResponseMatchDto } from '../dto/response-match.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    processMatch(responseMatchDto: ResponseMatchDto): void;
}

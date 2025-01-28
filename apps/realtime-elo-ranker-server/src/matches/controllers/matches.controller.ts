import { Body, Controller, Post } from '@nestjs/common';
import { MatchesService } from '../services/matches.service';
import { ResponseMatchDto } from '../dto/response-match.dto';

@Controller('match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  processMatch(@Body() responseMatchDto: ResponseMatchDto): void {
    this.matchesService.processMatch(responseMatchDto);
  }
}

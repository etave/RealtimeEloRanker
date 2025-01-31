import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchEntity } from '../entities/match.entity';
import { ResponseMatchDto } from '../dto/response-match.dto';
import { v4 } from 'uuid';

@Injectable()
export class MatchesDatabaseService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
  ) {}

  async addMatch(match: ResponseMatchDto) {
    match.id = v4();
    await this.matchRepository.insert(match);
  }

  async getMatchHistory(): Promise<ResponseMatchDto[]> {
    return (await this.matchRepository.find()).slice(-10);
  }
}

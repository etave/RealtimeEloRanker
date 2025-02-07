import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from '../src/ranking/controllers/ranking.controller';
import { RankingService } from '../src/ranking/services/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';

describe('RankingController', () => {
  let controller: RankingController;
  let rankingService: RankingService;
  let eventEmitter: EventEmitter2;

  const mockRankingService = {
    getRanking: jest.fn(),
  };

  const mockEventEmitter = {
    on: jest.fn(),
    off: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        { provide: RankingService, useValue: mockRankingService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRanking', () => {
    it('should return ranking', () => {
      const result: ResponsePlayerDto[] = [{ id: 'player1', rank: 1000 }];
      jest.spyOn(rankingService, 'getRanking').mockReturnValue(result);

      expect(controller.getRanking()).toBe(result);
    });
  });
});

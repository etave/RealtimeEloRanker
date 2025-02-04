import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches/services/matches.service';
import { RankingService } from './ranking/services/ranking.service';
import { ResponsePlayerDto } from './players/dto/response-player.dto';
import { ResponseMatchDto } from './matches/dto/response-match.dto';
import { MatchesDatabaseService } from './matches/services/matches-database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MatchesService', () => {
  let service: MatchesService;
  let rankingService: RankingService;

  const mockPlayer1: ResponsePlayerDto = {
    id: 'player1',
    rank: 1000,
  };

  const mockPlayer2: ResponsePlayerDto = {
    id: 'player2',
    rank: 1200,
  };

  const mockRankingService = {
    getPlayer: jest.fn(),
    updatePlayerRanking: jest.fn(),
  };

  const mockMatchesDatabaseService = {
    addMatch: jest.fn(),
  };

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       MatchesService,
  //       { provide: RankingService, useValue: mockRankingService },
  //     ],
  //   }).compile();

  //   service = module.get<MatchesService>(MatchesService);
  //   rankingService = module.get<RankingService>(RankingService);
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        { provide: RankingService, useValue: mockRankingService },
        {
          provide: MatchesDatabaseService,
          useValue: mockMatchesDatabaseService,
        },
        { provide: EventEmitter2, useValue: new EventEmitter2() },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
    rankingService = module.get<RankingService>(RankingService);
  });

  describe('processMatch', () => {
    it('should process a win correctly', async () => {
      mockRankingService.getPlayer.mockImplementation((id) =>
        Promise.resolve(id === 'player1' ? mockPlayer1 : mockPlayer2),
      );

      const responseMatch: ResponseMatchDto = {
        winner: 'player1',
        loser: 'player2',
        draw: false,
      };

      await service.processMatch(responseMatch);

      expect(mockRankingService.updatePlayerRanking).toHaveBeenCalledTimes(2);
    });

    it('should process a draw correctly', async () => {
      mockRankingService.getPlayer.mockImplementation((id) =>
        Promise.resolve(id === 'player1' ? mockPlayer1 : mockPlayer2),
      );

      const responseMatch: ResponseMatchDto = {
        winner: 'player1',
        loser: 'player2',
        draw: true,
      };
      await service.processMatch(responseMatch);

      expect(mockRankingService.updatePlayerRanking).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('calculateVictoryProbabilities', () => {
    it('should calculate correct probability', () => {
      const probability = service['calculateVictoryProbabilities'](1000, 1200);
      expect(probability).toBeCloseTo(0.24, 2);
    });
  });

  describe('calculateNewRanks', () => {
    it('should calculate new ranks for win', () => {
      const [newWinnerRank, newLoserRank] = service['calculateNewRanks'](
        mockPlayer1,
        mockPlayer2,
        false,
      );

      expect(newWinnerRank).toBeGreaterThan(mockPlayer1.rank);
      expect(newLoserRank).toBeLessThan(mockPlayer2.rank);
    });

    it('should calculate new ranks for draw', () => {
      const [newPlayer1Rank, newPlayer2Rank] = service['calculateNewRanks'](
        mockPlayer1,
        mockPlayer2,
        true,
      );

      expect(newPlayer1Rank).toBeGreaterThan(mockPlayer1.rank);
      expect(newPlayer2Rank).toBeLessThan(mockPlayer2.rank);
    });
  });
});

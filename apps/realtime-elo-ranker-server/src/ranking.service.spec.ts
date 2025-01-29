import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingService } from './ranking/services/ranking.service';
import { RankingCacheService } from './ranking/services/ranking-cache.service';
import { PlayerService } from './players/services/player.service';
import { NotFoundException } from '@nestjs/common';
import { ResponsePlayerDto } from './players/dto/response-player.dto';

describe('RankingService', () => {
  let service: RankingService;
  let eventEmitter: EventEmitter2;
  let rankingCacheService: RankingCacheService;
  let playerService: PlayerService;

  const mockPlayer: ResponsePlayerDto = {
    id: 'player1',
    rank: 1000,
  };

  const mockEventEmitter = {
    on: jest.fn(),
    emit: jest.fn(),
  };

  const mockRankingCacheService = {
    getPlayer: jest.fn(),
    getPlayers: jest.fn(),
    updatePlayer: jest.fn(),
    initializeCache: jest.fn(),
  };

  const mockPlayerService = {
    refreshPlayerRanking: jest.fn(),
    updatePlayer: jest.fn(),
    getAllPlayers: jest.fn().mockResolvedValue([
      { id: 'player1', rank: 1000 },
      { id: 'player2', rank: 1200 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: EventEmitter2, useValue: mockEventEmitter },
        { provide: RankingCacheService, useValue: mockRankingCacheService },
        { provide: PlayerService, useValue: mockPlayerService },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    rankingCacheService = module.get<RankingCacheService>(RankingCacheService);
    playerService = module.get<PlayerService>(PlayerService);

    service.onModuleInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPlayer', () => {
    it('should return player when found', async () => {
      mockRankingCacheService.getPlayer.mockReturnValue(mockPlayer);
      const result = await service.getPlayer('player1');
      expect(result).toEqual(mockPlayer);
    });

    it('should throw NotFoundException when player not found', async () => {
      mockRankingCacheService.getPlayer.mockReturnValue(undefined);
      await expect(service.getPlayer('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getRanking', () => {
    it('should return players list when not empty', () => {
      mockRankingCacheService.getPlayers.mockReturnValue([mockPlayer]);
      expect(service.getRanking()).toEqual([mockPlayer]);
    });

    it('should throw NotFoundException when ranking is empty', () => {
      mockRankingCacheService.getPlayers.mockReturnValue([]);
      expect(() => service.getRanking()).toThrow(NotFoundException);
    });
  });

  describe('updatePlayerRanking', () => {
    it('should update player ranking', () => {
      service.updatePlayerRanking(mockPlayer);
      expect(mockRankingCacheService.updatePlayer).toHaveBeenCalledWith(
        mockPlayer,
      );
      expect(mockPlayerService.updatePlayer).toHaveBeenCalledWith(mockPlayer);
    });
  });
});

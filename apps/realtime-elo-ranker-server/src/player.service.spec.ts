import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './players/services/player.service';
import { RankingCacheService } from './ranking/services/ranking-cache.service';
import { PlayerDatabaseService } from './players/services/player-database.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ResponsePlayerDto } from './players/dto/response-player.dto';

describe('PlayerService', () => {
  let service: PlayerService;
  let rankingCacheService: RankingCacheService;
  let playerDatabaseService: PlayerDatabaseService;

  const mockPlayer: ResponsePlayerDto = {
    id: 'player1',
    rank: 1000,
  };

  const mockRankingCacheService = {
    getAverageElo: jest.fn().mockReturnValue(1000),
    addPlayer: jest.fn(),
  };

  const mockPlayerDatabaseService = {
    getPlayer: jest.fn(),
    addPlayer: jest.fn(),
    getAllPlayers: jest.fn(),
    updatePlayer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: RankingCacheService, useValue: mockRankingCacheService },
        { provide: PlayerDatabaseService, useValue: mockPlayerDatabaseService },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    rankingCacheService = module.get<RankingCacheService>(RankingCacheService);
    playerDatabaseService = module.get<PlayerDatabaseService>(
      PlayerDatabaseService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPlayer', () => {
    it('should create a new player successfully', async () => {
      mockPlayerDatabaseService.getPlayer.mockResolvedValue(null);
      const result = await service.addPlayer('player1');
      expect(result).toEqual(mockPlayer);
      expect(mockPlayerDatabaseService.addPlayer).toHaveBeenCalledWith(
        mockPlayer,
      );
      expect(mockRankingCacheService.addPlayer).toHaveBeenCalledWith(
        mockPlayer,
      );
    });

    it('should throw BadRequestException for empty player id', async () => {
      await expect(service.addPlayer('')).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException for existing player', async () => {
      mockPlayerDatabaseService.getPlayer.mockResolvedValue(mockPlayer);
      await expect(service.addPlayer('player1')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getAllPlayers', () => {
    it('should return all players', async () => {
      const players = [mockPlayer];
      mockPlayerDatabaseService.getAllPlayers.mockResolvedValue(players);
      const result = await service.getAllPlayers();
      expect(result).toEqual(players);
    });
  });

  describe('updatePlayer', () => {
    it('should update player successfully', async () => {
      await service.updatePlayer(mockPlayer);
      expect(mockPlayerDatabaseService.updatePlayer).toHaveBeenCalledWith(
        mockPlayer,
      );
    });
  });
});

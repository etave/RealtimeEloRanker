import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { RankingCacheService } from './ranking/services/ranking-cache.service';

describe('RankingCacheService', () => {
  let service: RankingCacheService;
  let eventEmitter: EventEmitter2;
  let emitSpy: jest.SpyInstance;

  const mockPlayer1 = {
    id: 'player1',
    rank: 1000,
  };

  const mockPlayer2 = {
    id: 'player2',
    rank: 1400,
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
        {
          provide: RankingCacheService,
          useFactory: (eventEmitter: EventEmitter2) =>
            RankingCacheService.getInstance(eventEmitter),
          inject: [EventEmitter2],
        },
      ],
    }).compile();

    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    service = module.get<RankingCacheService>(RankingCacheService);
    service.clearCache();
    emitSpy = mockEventEmitter.emit;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a player', () => {
    service.addPlayer(mockPlayer1);

    expect(service.getPlayer(mockPlayer1.id)).toEqual(mockPlayer1);
    expect(emitSpy).toHaveBeenCalledWith('cache.updated', mockPlayer1.id);
  });

  it('should update a player', () => {
    const updatedPlayer = { ...mockPlayer1, rank: 1100 };

    service.addPlayer(mockPlayer1);
    service.updatePlayer(updatedPlayer);

    expect(service.getPlayer(mockPlayer1.id)).toEqual(updatedPlayer);
    expect(emitSpy).toHaveBeenCalledWith('cache.updated', mockPlayer1.id);
  });

  it('should get a player', () => {
    service.addPlayer(mockPlayer1);

    expect(service.getPlayer(mockPlayer1.id)).toEqual(mockPlayer1);
  });

  it('should get all players', () => {
    service.addPlayer(mockPlayer1);
    service.addPlayer(mockPlayer2);

    expect(service.getPlayers()).toEqual([mockPlayer1, mockPlayer2]);
  });

  it('should get average elo', () => {
    service.addPlayer(mockPlayer1);
    service.addPlayer(mockPlayer2);

    expect(service.getAverageElo()).toBe(1200);
  });
});

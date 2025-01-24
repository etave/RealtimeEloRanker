import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { RankingCacheService } from './services/ranking-cache.service';

describe('RankingCacheService', () => {
  let service: RankingCacheService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    (RankingCacheService as any).singleton = null;

    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        EventEmitter2,
        {
          provide: RankingCacheService,
          useFactory: (eventEmitter: EventEmitter2) => RankingCacheService.getInstance(eventEmitter),
          inject: [EventEmitter2],
        },
      ],
    }).compile();

    await module.init();
    service = module.get<RankingCacheService>(RankingCacheService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should maintain singleton instance', () => {
    const instance1 = RankingCacheService.getInstance(eventEmitter);
    const instance2 = RankingCacheService.getInstance(eventEmitter);
    expect(instance1).toBe(instance2);
  });

  it('should add and retrieve player', () => {
    const player = { id: '1', name: 'Player1', elo: 1200 };
    service.addPlayer(player);
    expect(service.getPlayer('1')).toEqual(player);
  });

  it('should return sorted rankings', () => {
    const player1 = { id: '1', name: 'Player 1', elo: 1200 };
    const player2 = { id: '2', name: 'Player 2', elo: 1400 };
    
    service.addPlayer(player1);
    service.addPlayer(player2);
    
    const rankings = service.getRanking();
    expect(rankings[0]).toEqual(player2);
    expect(rankings[1]).toEqual(player1);
  });
});
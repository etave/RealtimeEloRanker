import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDatabaseService } from './players/services/player-database.service';
import { PlayerEntity } from './players/entities/player.entity';
import { ResponsePlayerDto } from './players/dto/response-player.dto';

describe('PlayerDatabaseService', () => {
    let service: PlayerDatabaseService;
    let repository: Repository<PlayerEntity>;

    const mockPlayer1: ResponsePlayerDto = {
        id: 'player 1',
        rank: 1200,
    };

    const mockPlayer2: ResponsePlayerDto = {
        id: 'player 2',
        rank: 500,
    };

    const mockRepository = {
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        insert: jest.fn(),
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerDatabaseService,
                {
                    provide: getRepositoryToken(PlayerEntity),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PlayerDatabaseService>(PlayerDatabaseService);
        repository = module.get<Repository<PlayerEntity>>(getRepositoryToken(PlayerEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add a player', async () => {
        await service.addPlayer(mockPlayer1);
        expect(mockRepository.insert).toHaveBeenCalledWith(mockPlayer1);
    });

    it('should update a player', async () => {
        await service.updatePlayer(mockPlayer1);
        expect(mockRepository.save).toHaveBeenCalledWith(mockPlayer1);
    });

    it('should get a player', async () => {
        mockRepository.findOne.mockResolvedValue(mockPlayer1);
        const player = await service.getPlayer('player 1');
        expect(player).toEqual(mockPlayer1);
    });

    it('should get all players', async () => {
        mockRepository.find.mockResolvedValue([mockPlayer1, mockPlayer2]);
        const players = await service.getAllPlayers();
        expect(players).toEqual([mockPlayer1, mockPlayer2]);
    });
});
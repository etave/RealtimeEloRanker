import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDatabaseService } from './services/player-database.service';
import { PlayerEntity } from './players/entities/player.entity';
import { ResponsePlayerDto } from './players/dto/response-player.dto';

describe('PlayerDatabaseService', () => {
    let service: PlayerDatabaseService;
    let repository: Repository<PlayerEntity>;

    const mockPlayer: ResponsePlayerDto = {
        id: '1',
        name: 'Player 1',
        elo: 1200
    };

    const mockRepository = {
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        insert: jest.fn(),
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

    describe('getPlayer', () => {
        it('should return a player when found', async () => {
            mockRepository.findOne.mockResolvedValue(mockPlayer);
            const result = await service.getPlayer('1');
            expect(result).toEqual(mockPlayer);
        });

        it('should throw error when player not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.getPlayer('1')).rejects.toThrow('Player 1 not found');
        });
    });

    describe('updatePlayer', () => {
        it('should update player successfully', async () => {
            await service.updatePlayer(mockPlayer);
            expect(repository.save).toHaveBeenCalledWith(mockPlayer);
        });
    });

    describe('removePlayer', () => {
        it('should remove player successfully', async () => {
            await service.removePlayer('1');
            expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('addPlayer', () => {
        it('should add player successfully', async () => {
            await service.addPlayer(mockPlayer);
            expect(repository.insert).toHaveBeenCalledWith(mockPlayer);
        });
    });
});
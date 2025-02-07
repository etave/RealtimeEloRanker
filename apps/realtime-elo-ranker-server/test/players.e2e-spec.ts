import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from '../src/players/entities/player.entity';
import { Repository } from 'typeorm';

describe('PlayersController (e2e)', () => {
  let app: INestApplication;
  let playerRepository: Repository<PlayerEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [PlayerEntity],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    playerRepository = moduleFixture.get('PlayerEntityRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await playerRepository.query('DELETE FROM players');
  });

  it('/player (POST)', async () => {
    const playerData = { id: 'Player 1' };
    const response = await request(app.getHttpServer())
      .post('/player')
      .send(playerData)
      .expect(201);

    expect(response.body).toMatchObject(playerData);
    const player = await playerRepository.findOne({
      where: { id: 'Player 1' },
    });
    expect(player).toBeDefined();
    expect(player).not.toBeNull();
    expect(player!.rank).toBe(1200);
  });
});

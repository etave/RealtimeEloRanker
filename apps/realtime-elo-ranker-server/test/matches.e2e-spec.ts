import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchEntity } from '../src/matches/entities/match.entity';

describe('MatchesController (e2e)', () => {
  let app: INestApplication;
  let matchRepository: Repository<MatchEntity>;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [MatchEntity],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    matchRepository = moduleFixture.get('MatchEntityRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await matchRepository.query('DELETE FROM match');
  });

  it('moduleFixture should be defined', () => {
    expect(moduleFixture).toBeDefined();
  });

  it('moduleFixture should have AppModule imported', () => {
    const appModule = moduleFixture.get(AppModule);
    expect(appModule).toBeDefined();
  });

  it('moduleFixture should have TypeOrmModule configured', () => {
    const typeOrmModule = moduleFixture.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });
});

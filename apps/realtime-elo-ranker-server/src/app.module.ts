import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
imports: [
  TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),
  PlayersModule
]
export class AppModule {}
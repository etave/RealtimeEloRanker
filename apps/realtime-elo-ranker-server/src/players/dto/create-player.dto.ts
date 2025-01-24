import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  elo: number;
}
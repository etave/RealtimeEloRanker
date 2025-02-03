import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';

export class ResponseMatchDto {
  id?: string;
  winner: string;
  loser: string;
  draw: boolean;
}

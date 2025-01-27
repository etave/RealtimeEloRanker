import { ResponsePlayerDto } from '../../players/dto/response-player.dto';
export interface RankingEvent {
    type: 'RankingUpdate' | 'Error';
}
export interface RankingUpdate extends RankingEvent {
    type: 'RankingUpdate';
    players: ResponsePlayerDto[];
}

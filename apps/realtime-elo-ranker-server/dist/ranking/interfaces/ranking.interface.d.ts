import { ResponsePlayerDto } from 'src/players/dto/response-player.dto';
export declare enum RankingEventType {
    RankingUpdate = "RankingUpdate",
    Error = "Error"
}
export interface RankingEvent {
    type: RankingEventType;
    player?: ResponsePlayerDto;
}

import { CreatePlayerDto } from '../dto/create-player.dto';
import { ResponsePlayerDto } from '../dto/response-player.dto';
import { PlayerService } from '../services/player.service';
export declare class PlayersController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto>;
}

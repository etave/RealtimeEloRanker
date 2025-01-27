import { Repository } from "typeorm";
import { PlayerEntity } from "../entities/player.entity";
import { ResponsePlayerDto } from "../dto/response-player.dto";
export declare class PlayerDatabaseService {
    private playerRepository;
    constructor(playerRepository: Repository<PlayerEntity>);
    getPlayer(id: string): Promise<ResponsePlayerDto>;
    updatePlayer(player: ResponsePlayerDto): Promise<void>;
    removePlayer(id: string): Promise<void>;
    addPlayer(player: ResponsePlayerDto): Promise<void>;
    getAllPlayers(): Promise<ResponsePlayerDto[]>;
}

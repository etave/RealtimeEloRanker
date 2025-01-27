import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerEntity } from "../entities/player.entity";
import { ResponsePlayerDto } from "../dto/response-player.dto";

@Injectable()
export class PlayerDatabaseService {
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>
    )
    {}

    async getPlayer(id: string): Promise<ResponsePlayerDto> {
        const player = await this.playerRepository.findOne({ where: { id } });
        if (!player) {
            throw new Error(`Player ${id} not found`);
        }
        return player;
    }

    async updatePlayer(player: ResponsePlayerDto) {
        await this.playerRepository.save(player);
    }

    async removePlayer(id: string) {
        await this.playerRepository.delete({ id });
    }

    async addPlayer(player: ResponsePlayerDto) {
        await this.playerRepository.insert(player);
    }

    async getAllPlayers(): Promise<ResponsePlayerDto[]> {
        return this.playerRepository.find();
    }
}
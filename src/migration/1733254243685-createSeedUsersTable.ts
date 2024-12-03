import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../database/data-source";
import userSeed from "../seeders/UserSeed";

export class CreateSeedUsersTable1733254243685 implements MigrationInterface {

    public async up(): Promise<void> {
        //criando repositorio
        const usewrsRepository = AppDataSource.getRepository('user');

        await usewrsRepository.save(userSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

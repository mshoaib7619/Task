import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1732262162939 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user";
        `);
    }
}

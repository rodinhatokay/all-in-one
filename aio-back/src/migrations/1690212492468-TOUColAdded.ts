import { MigrationInterface, QueryRunner } from "typeorm";

export class TOUColAdded1690212492468 implements MigrationInterface {
    name = 'TOUColAdded1690212492468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "terms_of_use" ADD "modifiedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "terms_of_use" DROP COLUMN "modifiedAt"`);
    }

}

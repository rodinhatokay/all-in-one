import { MigrationInterface, QueryRunner } from "typeorm";

export class AddToUserColIsDeleted1690892914418 implements MigrationInterface {
    name = 'AddToUserColIsDeleted1690892914418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class TermsOfUseCreation1690212069869 implements MigrationInterface {
	name = 'TermsOfUseCreation1690212069869';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."terms_of_use_language_enum" AS ENUM('ENGLISH', 'HEBREW', 'ARABIC')`,
		);
		await queryRunner.query(
			`CREATE TABLE "terms_of_use" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "language" "public"."terms_of_use_language_enum" NOT NULL DEFAULT 'ENGLISH', CONSTRAINT "PK_876c6c2717bea0d112b5a863cc1" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "terms_of_use"`);
		await queryRunner.query(`DROP TYPE "public"."terms_of_use_language_enum"`);
	}
}


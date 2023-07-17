import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1689626172866 implements MigrationInterface {
	name = 'SchemaSync1689626172866';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "business" ADD "address" character varying NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "business" ADD "categoryId" uuid`);
		await queryRunner.query(
			`ALTER TABLE "business" ADD CONSTRAINT "FK_a8c4f2a15b5d089c9a6a771c4fc" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "business" DROP CONSTRAINT "FK_a8c4f2a15b5d089c9a6a771c4fc"`,
		);
		await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "categoryId"`);
		await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "address"`);
		await queryRunner.query(`DROP TABLE "category"`);
	}
}


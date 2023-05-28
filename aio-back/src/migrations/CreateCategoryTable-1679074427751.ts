import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1679074427751 implements MigrationInterface {
	name = 'CreateCategoryTable1679074427751';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE category (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        PRIMARY KEY (id)
      )
    `);

		await queryRunner.query(`
      CREATE TABLE subcategory (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        categoryId UUID NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (categoryId) REFERENCES category (id) ON DELETE CASCADE
      )
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "maincategory"`);
		await queryRunner.query(`DROP TABLE "subcategory"`);
	}
}

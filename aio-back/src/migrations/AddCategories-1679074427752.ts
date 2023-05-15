import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategories1679074427752 implements MigrationInterface {
  name = 'AddCategoriesTable1679074427752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "category" ("name")
      VALUES
        ('Food'),
        ('Carpentry'),
        ('Stores'),
        ('Care and beauty')
    `);

    await queryRunner.query(`
      INSERT INTO subcategory (name, categoryId)
      VALUES
        ('Fast food', (SELECT id FROM category WHERE name = 'Food')),
        ('Home food', (SELECT id FROM category WHERE name = 'Food')),
        ('Professional', (SELECT id FROM category WHERE name = 'Carpentry')),
        ('amateurs', (SELECT id FROM category WHERE name = 'Carpentry'))
  `);
  }

  public async down(): Promise<void> {
    Promise.resolve();
  }
}

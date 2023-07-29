import { MigrationInterface, QueryRunner } from "typeorm"

export class AddForeignKeysToUserFavoriteBusinesses1631303405982 implements MigrationInterface {
    name = 'AddForeignKeysToUserFavoriteBusinesses1631303405982'

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Add foreign key constraints to the existing table
      await queryRunner.query(`
        ALTER TABLE "user_favorite_businesses"
        ADD CONSTRAINT "FK_user_favorite_businesses_userId_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
      `);
  
      await queryRunner.query(`
        ALTER TABLE "user_favorite_businesses"xp
        ADD CONSTRAINT "FK_user_favorite_businesses_businessId_business" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE
      `);
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      // Remove foreign key constraints from the existing table
      await queryRunner.query(`
        ALTER TABLE "user_favorite_businesses"
        DROP CONSTRAINT "FK_user_favorite_businesses_userId_user"
      `);
  
      await queryRunner.query(`
        ALTER TABLE "user_favorite_businesses"
        DROP CONSTRAINT "FK_user_favorite_businesses_businessId_business"
      `);
    }
  }
  
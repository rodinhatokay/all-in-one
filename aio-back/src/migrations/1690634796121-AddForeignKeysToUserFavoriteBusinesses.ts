import { MigrationInterface, QueryRunner } from "typeorm"

export class AddForeignKeysToUserFavoriteBusinesses1631303405982 implements MigrationInterface {
    name = 'AddForeignKeysToUserFavoriteBusinesses1631303405982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          -- Create the "favorite_businesses" table
          CREATE TABLE "favorite_businesses" (
              "userId" uuid NOT NULL,
              "business_id" uuid NOT NULL,
              CONSTRAINT "PK_8e00b134db84f47b551b4e083f6" PRIMARY KEY ("userId", "business_id")
          );
    
          -- Create foreign keys
          ALTER TABLE "favorite_businesses" ADD CONSTRAINT "FK_9e32ae26a81c7cf6dcecaa27b56" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;
          ALTER TABLE "favorite_businesses" ADD CONSTRAINT "FK_50256e61c526b65b58a6ef5eb45" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE CASCADE;
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          -- Drop foreign keys
          ALTER TABLE "favorite_businesses" DROP CONSTRAINT "FK_9e32ae26a81c7cf6dcecaa27b56";
          ALTER TABLE "favorite_businesses" DROP CONSTRAINT "FK_50256e61c526b65b58a6ef5eb45";
    
          -- Drop the "favorite_businesses" table
          DROP TABLE "favorite_businesses";
        `);
      }
}
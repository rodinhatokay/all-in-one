import { MigrationInterface, QueryRunner } from "typeorm"

export class FavoriteBusiness1690356054187 implements MigrationInterface {
    name = 'FavoriteBusiness1690356054187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "user_favorite_businesses" ("userId" uuid NOT NULL, "businessId" uuid NOT NULL, CONSTRAINT "PK_user_favorite_businesses_userId_businessId" PRIMARY KEY ("userId", "businessId"))`
        );
        await queryRunner.query(
          `CREATE INDEX "IDX_user_favorite_businesses_userId" ON "user_favorite_businesses" ("userId") `
        );
        await queryRunner.query(
          `CREATE INDEX "IDX_user_favorite_businesses_businessId" ON "user_favorite_businesses" ("businessId") `
        );
        await queryRunner.query(
          `ALTER TABLE "user_favorite_businesses" ADD CONSTRAINT "FK_user_favorite_businesses_userId_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
          `ALTER TABLE "user_favorite_businesses" ADD CONSTRAINT "FK_user_favorite_businesses_businessId_business" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorite_businesses" DROP CONSTRAINT "FK_user_favorite_businesses_businessId_business"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_businesses" DROP CONSTRAINT "FK_user_favorite_businesses_userId_user"`);
        await queryRunner.query(`DROP INDEX "IDX_user_favorite_businesses_businessId"`);
        await queryRunner.query(`DROP INDEX "IDX_user_favorite_businesses_userId"`);
        await queryRunner.query(`DROP TABLE "user_favorite_businesses"`);
      }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1684180798912 implements MigrationInterface {
  name = 'SchemaSync1684180798912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sub_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "UQ_7745a7cea2687ee7b048f828c76" UNIQUE ("name"), CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying NOT NULL, "otpCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "otpId" uuid, CONSTRAINT "REL_483a6adaf636e520039e97ef61" UNIQUE ("otpId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "UQ_c6894e962b80bc10a694c0271e2" UNIQUE ("name"), CONSTRAINT "REL_a8c4f2a15b5d089c9a6a771c4f" UNIQUE ("categoryId"), CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_businesses_business" ("userId" uuid NOT NULL, "businessId" uuid NOT NULL, CONSTRAINT "PK_46d1490fcdc25d0fdda94747a53" PRIMARY KEY ("userId", "businessId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b93fc5d0322f3d5bfab8561bc4" ON "user_favorite_businesses_business" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f741e408d7f64aefb178c5475c" ON "user_favorite_businesses_business" ("businessId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_483a6adaf636e520039e97ef617" FOREIGN KEY ("otpId") REFERENCES "otp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business" ADD CONSTRAINT "FK_a8c4f2a15b5d089c9a6a771c4fc" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_businesses_business" ADD CONSTRAINT "FK_b93fc5d0322f3d5bfab8561bc4c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_businesses_business" ADD CONSTRAINT "FK_f741e408d7f64aefb178c5475c3" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      'ALTER TABLE business DROP CONSTRAINT "REL_a8c4f2a15b5d089c9a6a771c4f"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_businesses_business" DROP CONSTRAINT "FK_f741e408d7f64aefb178c5475c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_businesses_business" DROP CONSTRAINT "FK_b93fc5d0322f3d5bfab8561bc4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business" DROP CONSTRAINT "FK_a8c4f2a15b5d089c9a6a771c4fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_483a6adaf636e520039e97ef617"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f741e408d7f64aefb178c5475c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b93fc5d0322f3d5bfab8561bc4"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_businesses_business"`);
    await queryRunner.query(`DROP TABLE "business"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "sub_category"`);
  }
}

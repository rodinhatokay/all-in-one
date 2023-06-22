import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1687440990757 implements MigrationInterface {
    name = 'SchemaSync1687440990757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "terms" boolean, "phoneNumber" character varying NOT NULL, "isFullyRegistered" boolean, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "channel" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "opening_hours" ("id" SERIAL NOT NULL, "day" character varying NOT NULL, "hours" jsonb NOT NULL, "businessId" uuid, CONSTRAINT "PK_09415e2b345103b1f5971464f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "logoPath" character varying NOT NULL, "description" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "hasWhatsapp" boolean NOT NULL, "locationLatitude" double precision NOT NULL, "locationLongitude" double precision NOT NULL, CONSTRAINT "UQ_c6894e962b80bc10a694c0271e2" UNIQUE ("name"), CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "opening_hours" ADD CONSTRAINT "FK_6e693f22d9c0564eacb9f218385" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opening_hours" DROP CONSTRAINT "FK_6e693f22d9c0564eacb9f218385"`);
        await queryRunner.query(`DROP TABLE "business"`);
        await queryRunner.query(`DROP TABLE "opening_hours"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

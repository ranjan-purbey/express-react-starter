import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPost1596921181659 implements MigrationInterface {
    name = 'AddPost1596921181659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying NOT NULL, "body" text NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}

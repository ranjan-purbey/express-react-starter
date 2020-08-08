import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableUUIDExtension1596918934374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

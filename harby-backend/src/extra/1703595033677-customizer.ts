import { generateEntityId } from "@medusajs/utils";
import { MigrationInterface, QueryRunner } from "typeorm";

export class customizer1703595033677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customizer" ("id" SERIAL PRIMARY KEY, "url" character varying NULL, "name" character varying NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customizer"`);
  }
}

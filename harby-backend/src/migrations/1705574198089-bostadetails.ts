import { generateEntityId } from "@medusajs/utils";
import { MigrationInterface, QueryRunner } from "typeorm";

export class bostadetails1705574198089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bosta" ("id" SERIAL PRIMARY KEY, "trackingnumber" character varying NULL, "sender" json  NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bosta"`);
  }
}

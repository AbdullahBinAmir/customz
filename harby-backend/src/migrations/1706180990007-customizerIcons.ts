import { generateEntityId } from "@medusajs/utils";
import { MigrationInterface, QueryRunner } from "typeorm";

export class customizerIcons1706180990007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE "icons" ("id" character varying NOT NULL, "customizable_product_id" character varying  NULL, "url" character varying  NULL)`
      );

    await queryRunner.query(
      `INSERT INTO "icons" ("id","customizable_product_id", "url") VALUES ('${generateEntityId(
        "",
        "icons"
      )}' ,NULL, NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "icons"`);
  }
}

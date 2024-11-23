import { generateEntityId } from "@medusajs/utils";
import { MigrationInterface, QueryRunner } from "typeorm";

export class customizerTable1706180927632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customizer" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NULL ,"thumbnail" character varying NULL)`
    );

    await queryRunner.query(
      `INSERT INTO "customizer" ("id","name", "thumbnail") VALUES ('${generateEntityId(
        "",
        "personalizer"
      )}' ,NULL, NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customizer"`);
  }
}

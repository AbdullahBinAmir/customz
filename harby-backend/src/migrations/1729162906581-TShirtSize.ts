import { MigrationInterface, QueryRunner } from "typeorm"

export class TShirtSize1729162906581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "t_shirt_size" ("id" varchar PRIMARY KEY NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fit" varchar NOT NULL, "product_id" varchar NOT NULL, "size" varchar NOT NULL, "chest_min" integer NOT NULL, "chest_max" integer NOT NULL, "length" integer NOT NULL)`
        )
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "t_shirt_size"`)
      }

}

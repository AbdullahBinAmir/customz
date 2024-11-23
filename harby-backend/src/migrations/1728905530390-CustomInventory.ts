import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomInventory1728905530390 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "custom_inventory" (
             "id" character varying NOT NULL,
              "color" character varying NUll  ,
              "qty" character varying NUll  ,
              "type" character varying NUll  ,
              "size" character varying NUll  ,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        )`
          );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "custom_inventory"`);
    }
}

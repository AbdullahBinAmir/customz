import { MigrationInterface, QueryRunner } from "typeorm"

export class BulkOrderCreate1724830888248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "bulkorder" (
             "id" uuid PRIMARY KEY,
              "first_name" character varying NULL , 
              "last_name" character varying NUll  ,
              "phone" character varying NUll  ,
              "email" character varying NUll  ,
              "type" character varying NUll  ,
              "material" character varying NUll  ,
              "color" character varying NUll  ,
              "size" character varying NUll  ,
              "qty" character varying NUll  ,
              "print_technique" character varying NUll  ,
              "desc" character varying NUll  ,
              "address" character varying NUll  ,
              "status" character varying NUll  ,
              "img" character varying NUll  ,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        )`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bulkorder"`);
    }

}

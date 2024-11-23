import { MigrationInterface, QueryRunner } from "typeorm";

export class Rating1724338788877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "rating" (
                    "id" character varying NULL , 
                    "productid" character varying NULL , 
                    "user_id" character varying NULL , 
                    "rating" character varying NUll  ,
                    "review" character varying NUll  ,
                    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                    "current_step" character varying NULL, 
                    "is_complete" boolean)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rating"`);
  }
}

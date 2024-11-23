import { MigrationInterface, QueryRunner } from "typeorm";

export class Subscription1724919558774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "subscription" (
             "id" uuid PRIMARY KEY,
              "email" character varying NUll,
              "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subscription"`);
  }
}

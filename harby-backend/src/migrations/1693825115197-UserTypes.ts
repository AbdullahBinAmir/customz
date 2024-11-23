import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTypes1693825115197 implements MigrationInterface {
  name = "UserTypes1693825115197";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "user_type" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type"`);
  }
}

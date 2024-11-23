import { MigrationInterface, QueryRunner } from "typeorm";

class bostadetailsChange1705574974015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "bosta"' + ' ADD COLUMN "orderid" character varying NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP COLUMN "rating"');
  }
}

export default bostadetailsChange1705574974015;

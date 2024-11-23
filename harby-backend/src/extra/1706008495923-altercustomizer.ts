import { MigrationInterface, QueryRunner } from "typeorm";

class AlterCustomizer1706008495923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "customizer" ADD COLUMN "icons" text ARRAY'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "customizer" DROP COLUMN "icons"');
  }
}

export default AlterCustomizer1706008495923;

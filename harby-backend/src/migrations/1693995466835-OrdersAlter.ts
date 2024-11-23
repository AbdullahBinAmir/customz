import { MigrationInterface, QueryRunner } from "typeorm"

export class OrdersAlter1693995466835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"product\"" +
            " ADD COLUMN \"designerImage\" text"
        )
        await queryRunner.query(
            "ALTER TABLE \"product\"" +
            " ADD COLUMN \"customStatus\" text"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"product\" DROP COLUMN \"designerImage\""
        )
        await queryRunner.query(
            "ALTER TABLE \"product\" DROP COLUMN \"customStatus\""
        )
    }

}

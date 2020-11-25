import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addWhatsappInOrphanage1606328765756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orphanages', new TableColumn({
      name: 'whatsapp',
      type: 'varchar',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'whatsapp');
  }
}

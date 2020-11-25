import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAllowListForgotPassword1604365999879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'allow_list_forgot_password',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'token',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'expires_in',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'user_id',
          type: 'integer',
        },
      ],

      foreignKeys: [{
        name: 'RefreshTokenUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('allow_list_forgot_password');
  }
}

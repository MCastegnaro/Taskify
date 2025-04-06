import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1743878984286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TABLE "user" (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          email varchar(200) NOT NULL,
          username varchar(200) NOT NULL,
          name varchar(200) NOT NULL,
          password varchar NOT NULL,
          createdAt TIMESTAMP NOT NULL DEFAULT now(),
          updatedAt TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT PK_user_id PRIMARY KEY (id),
          CONSTRAINT UQ_user_email UNIQUE (email)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
  }
}

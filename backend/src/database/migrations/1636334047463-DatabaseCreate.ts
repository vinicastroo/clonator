import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseCreate1636334047463 implements MigrationInterface {
  name = 'DatabaseCreate1636334047463'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "answer" character varying NOT NULL, "next_question_yes_id" uuid, "next_question_no_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_be36278210a2fe3cee144f06d23" FOREIGN KEY ("next_question_yes_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_3cde5972e725f1875290dc7541d" FOREIGN KEY ("next_question_no_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_3cde5972e725f1875290dc7541d"`);
    await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_be36278210a2fe3cee144f06d23"`);
    await queryRunner.query(`DROP TABLE "question"`);
  }

}

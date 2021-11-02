import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseCreate1635810522499 implements MigrationInterface {
    name = 'DatabaseCreate1635810522499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "answer" character varying NOT NULL, "next_question_id" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_989083bdf5e5bb24a7539af7a40" FOREIGN KEY ("next_question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_989083bdf5e5bb24a7539af7a40"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}

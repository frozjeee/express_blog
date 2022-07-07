const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class user1623939028959 {
    name = 'user1623939028959'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "about" text, "is_admin" boolean NOT NULL, CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}

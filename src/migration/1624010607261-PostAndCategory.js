const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PostAndCategory1624010607261 {
    name = 'PostAndCategory1624010607261'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "likes" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_categories_category" ("postId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_91306c0021c4901c1825ef097ce" PRIMARY KEY ("postId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_93b566d522b73cb8bc46f7405b" ON "post_categories_category" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5e63f80ca58e7296d5864bd2d" ON "post_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_categories_category" ADD CONSTRAINT "FK_93b566d522b73cb8bc46f7405bd" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_categories_category" ADD CONSTRAINT "FK_a5e63f80ca58e7296d5864bd2d3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post_categories_category" DROP CONSTRAINT "FK_a5e63f80ca58e7296d5864bd2d3"`);
        await queryRunner.query(`ALTER TABLE "post_categories_category" DROP CONSTRAINT "FK_93b566d522b73cb8bc46f7405bd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`DROP INDEX "IDX_a5e63f80ca58e7296d5864bd2d"`);
        await queryRunner.query(`DROP INDEX "IDX_93b566d522b73cb8bc46f7405b"`);
        await queryRunner.query(`DROP TABLE "post_categories_category"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }
}

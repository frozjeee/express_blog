require('dotenv/config');
console.log("---------");
module.exports = {
    "type": "postgres",
    "host": "balarama.db.elephantsql.com",
    "url": "postgres://lbxxhclm:txFDRSLsargrBqghePYpBwpQOwW9fw1x@balarama.db.elephantsql.com/lbxxhclm",
    "port": 5432,
    "username": "lbxxhclm",
    "password": "txFDRSLsargrBqghePYpBwpQOwW9fw1x",
    "database": "lbxxhclm",
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entity/*.js",
     ],
     "migrations": [
         "src/migration/*.js"
    ],
     "cli": {
        entitiesDir: "src/entity",
        subscribersDir: "src/subscriber",
        migrationsDir: "src/migration"
    }
 };
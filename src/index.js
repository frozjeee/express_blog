const express = require('express');
const Stripe = require('stripe');
const redis = require('redis');
const redisCli = redis.createClient(
  {
    url: "redis://redis-18894.c135.eu-central-1-1.ec2.cloud.redislabs.com:18894",
    password: "7hx0UzGmzA1uXEemmebgosoXqoZ8Fjdq"
  }
);
redisCli.on("error", function(error) {
    console.error(error);
  });
const {createConnection} = require('typeorm');
const app = express();

app.use(express.json());


createConnection()
.then(async (conn) => {
    require('./routers/user')(app, conn);
    require('./routers/auth')(app, conn, redisCli);
    require('./routers/post')(app, conn);

    app.listen(3000);
})


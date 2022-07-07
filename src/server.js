const express = require('express');
const redis = require('redis');
const redisCli = redis.createClient(6379);
redisCli.on("error", function(error) {
    console.error(error);
  });
const app = express();

app.use(express.json());




app.listen(3000);

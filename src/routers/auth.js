const router = require('express').Router();

const path = '/api/auth';


module.exports = (app, conn, redisCli) => {
    require('../routes/auth')(router, conn, redisCli);
    app.use(path, router);
}
